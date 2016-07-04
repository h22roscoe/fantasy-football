package main

import (
	"database/sql"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"
)

type data struct {
	*sql.DB
}

type user struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "4200"

	}

	data := newDB()

	http.Handle("/hello", data.helloHandler())
	http.Handle("/auth/login", data.authHandler())
	http.Handle("/", http.FileServer(http.Dir("dist")))

	log.Println("Server is running on port: " + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func newDB() *data {
	db, err := sql.Open("postgres", "...")
	if err != nil {
		log.Fatal("Error opening (postgres) sql database")
	}

	return &data{db}
}

func (db *data) helloHandler() http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		io.WriteString(rw, "Hello, world!\n")
	})
}

func (db *data) authHandler() http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		switch req.Method {
		case "POST":
			decoder := json.NewDecoder(req.Body)

			var u user
			err := decoder.Decode(&u)
			if err != nil {
				http.Error(rw, err.Error(), http.StatusInternalServerError)
				return
			}

			log.Printf("who is this?: %s\n", "I'm in a POST")
			rw.Header().Set("Content-Type", "application/json")
			js, err := json.Marshal(&u)
			rw.Write(js)
		default:
			log.Fatalf("Not a supported method.\n")
		}
	})
}

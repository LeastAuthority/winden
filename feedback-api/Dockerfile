FROM golang:1.19

WORKDIR /usr/src/app

COPY feedback-api/go.mod feedback-api/go.sum ./
RUN go mod download && go mod verify

COPY feedback-api .
RUN go build -buildvcs=false -v -o /usr/local/bin/app ./...

CMD ["app"]
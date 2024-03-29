FROM denoland/deno:latest

WORKDIR /app

COPY . .

CMD ["deno", "task", "start"]

EXPOSE 8000:8000
FROM gcc:12.2 AS builder
COPY ./ /usr/src/myapp
WORKDIR /usr/src/myapp
RUN make

FROM debian:11-slim
COPY --from=builder /usr/src/myapp/qc_decrypt /usr/bin/qc_decrypt
RUN mkdir /data
WORKDIR /data
ENTRYPOINT [ "/usr/bin/qc_decrypt" ]


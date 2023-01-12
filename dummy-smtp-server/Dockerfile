FROM python:latest

RUN pip install aiosmtpd

EXPOSE 2500

CMD ["python", "-m", "aiosmtpd", "--nosetuid", "--debug", "--listen", "0.0.0.0:2500"]

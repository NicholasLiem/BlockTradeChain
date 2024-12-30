from cryptography.hazmat.primitives.kdf.scrypt import Scrypt
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
import binascii
import json

# Input JSON data
json_data = '''{"address":"2d349a29db6165ca2767fc3fa753e04716bdbb46","crypto":{"cipher":"aes-128-ctr","ciphertext":"5d8231ac34852c84d977ce14f4b9d6353088cb53f0656d419c0fad5418f4a748","cipherparams":{"iv":"a6f2a6e68c23b7b3e5e637218fbc3888"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"6b8cdfad07ee0d67686d20f2b3cf546557d0647b56f61048d612162146df6fe4"},"mac":"fb1d481f95c8fd8c16797d8c4e8780b59766125fdde29c0e45e88426d4bd84c1"},"id":"0ab7f135-29b8-4b8a-b6ed-4d8b7a78d936","version":3}'''

# Parse the JSON data
data = json.loads(json_data)

# Extract necessary values
ciphertext = bytes.fromhex(data["crypto"]["ciphertext"])
iv = bytes.fromhex(data["crypto"]["cipherparams"]["iv"])
salt = bytes.fromhex(data["crypto"]["kdfparams"]["salt"])
dklen = data["crypto"]["kdfparams"]["dklen"]

# Prompt user for the password
password = input("Enter the password to decrypt the private key: ")  # User enters the password

# Use scrypt to derive the key
kdf = Scrypt(
    salt=salt,
    length=dklen,
    n=262144,
    r=8,
    p=1,
    backend=default_backend()
)

key = kdf.derive(password.encode())

# Decrypt the ciphertext using AES-128-CTR mode
cipher = Cipher(
    algorithms.AES(key[:16]),  # Use the first 16 bytes of the derived key
    modes.CTR(iv),
    backend=default_backend()
)
decryptor = cipher.decryptor()
decrypted_data = decryptor.update(ciphertext) + decryptor.finalize()

# Print the decrypted private key in hexadecimal
print("Private key:", decrypted_data.hex())

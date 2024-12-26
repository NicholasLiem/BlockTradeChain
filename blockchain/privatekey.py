from cryptography.hazmat.primitives.kdf.scrypt import Scrypt
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
import binascii
import json

# Input JSON data
json_data = '''{
    "address":"e19f6f94a5f9d065243629b6593ad0ed82899944",
    "crypto":{
        "cipher":"aes-128-ctr",
        "ciphertext":"8b94a5c626d52be592b0003b75a3de4813bfad8243febc0db49529bc7a958fb8",
        "cipherparams":{
            "iv":"4a5143c06faf52ef35ef2991e7c24571"
        },
        "kdf":"scrypt",
        "kdfparams":{
            "dklen":32,
            "n":262144,
            "p":1,
            "r":8,
            "salt":"f658e3b4a0e56e66b9f065e6b7ca96db4f0811e1fdeac5f72970410e827f6c3f"
        },
        "mac":"3110d0e195d0fa0d44723403f186daf6f26dfdcc01e069e7a04c253f7573baa6"
    },
    "id":"bb1c29b9-2a45-43c0-8191-47a6ebf73460",
    "version":3
}'''

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

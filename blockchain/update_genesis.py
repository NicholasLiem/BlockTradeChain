import json
import glob

genesis_path = "./genesis.json"
accounts_path = "./accounts/keystore/*"

with open(genesis_path, "r") as f:
    genesis = json.load(f)

accounts = glob.glob(accounts_path)

for account_file in accounts:
    with open(account_file, "r") as acc_file:
        account = json.load(acc_file)["address"]
        genesis["alloc"][account] = {"balance": "1000000000000000000000"}  # 1000 Ether

with open(genesis_path, "w") as f:
    json.dump(genesis, f, indent=4)

print("Updated genesis.json with accounts.")
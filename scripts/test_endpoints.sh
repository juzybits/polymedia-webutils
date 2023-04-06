#!/usr/bin/env bash

show_content=false

while getopts 'c' option; do
  case "${option}" in
    c)
      show_content=true
      ;;
    *)
      echo "Unknown option: ${option}"
      exit 1
      ;;
  esac
done

SUI_RPC_HOSTS=(
  'https://fullnode.testnet.sui.io:443'
  'https://rpc-testnet.suiscan.xyz:443'
  'https://sui-rpc.testnet.lgns.net'
  'https://sui-testnet-endpoint.blockvision.org'
  'https://sui-testnet-rpc-germany.allthatnode.com'
  'https://sui-testnet-rpc-korea.allthatnode.com'
  'https://sui-testnet-rpc.allthatnode.com'
  'https://testnet.artifact.systems/sui'
  'https://sui-testnet.nodeinfra.com'
  # 'https://sui-testnet-fullnode.quantnode.tech' # Fast, but CORS error
  # 'https://fullnode.testnet.vincagame.com:443' # 502
  # 'https://sui-rpc-pt.testnet-pride.com' # notExists (outdated)
)

# Table header
printf "%-47s\t%-8s\t%-8s\n" "RPC URL" "Time" "Response Code"

# Curl each URL in the background and print tabulated results
for SUI_RPC_HOST in "${SUI_RPC_HOSTS[@]}"; do
  (response=$(curl --location --request POST "$SUI_RPC_HOST" \
      --header 'Content-Type: application/json' \
      --data-raw '{
        "jsonrpc": "2.0",
        "id": 1,
        "method": "sui_getObject",
        "params": [
          "0xec4c82836bcd537015b252df836cdcd27412f0a581591737cad0b8bfef7241d5",
          {
            "showType": true,
            "showOwner": true,
            "showPreviousTransaction": true,
            "showDisplay": false,
            "showContent": true,
            "showBcs": false,
            "showStorageRebate": true
          }
        ]
      }' \
      --silent \
      --write-out "%{time_total}\t%{http_code}\t" \
      --output "$(if $show_content; then echo "/dev/stdout"; else echo "/dev/null"; fi)"
    )
    printf "%-47s\t%-8s\t%-8s\n" "$SUI_RPC_HOST" "$(echo "$response" | awk '{print $1}')" "$(echo "$response" | awk '{print $2}')"
    if $show_content; then
      echo "----------"
      echo "$response" | awk 'NR>1'
    fi
  ) &
done

# Wait for all background jobs to finish
wait

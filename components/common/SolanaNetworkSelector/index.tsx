import { solanaNetworkState } from "@/store/solana";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { AiOutlineDown } from "react-icons/ai";

function SolanaNetworkSelector() {
    const [solanaNetwork, setSolanaNetwork] =
        useRecoilState(solanaNetworkState);

    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<AiOutlineDown />}
                colorScheme="primary"
            >
                {solanaNetwork === "mainnet-beta" ? "Mainnet Beta" : "Devnet"}
            </MenuButton>
            <MenuList bg="background.100">
                <MenuItem
                    bg="background.100"
                    _hover={{ bg: "primary.200" }}
                    onClick={() => {
                        setSolanaNetwork("mainnet-beta");
                    }}
                    isDisabled={solanaNetwork === "mainnet-beta"}
                >
                    Mainnet Beta
                </MenuItem>
                <MenuItem
                    bg="background.100"
                    _hover={{ bg: "primary.200" }}
                    onClick={() => {
                        setSolanaNetwork("devnet");
                    }}
                    isDisabled={solanaNetwork === "devnet"}
                >
                    Devnet
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default SolanaNetworkSelector;

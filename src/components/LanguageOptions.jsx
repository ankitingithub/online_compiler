import React from 'react'
import {
    Box,
    Button,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
  } from "@chakra-ui/react";
import { AVAL_LANGS } from './constants';

const languages = Object.entries(AVAL_LANGS);
const ACTIVE_COLOR = "blue.400";

function LanguageOptions({lang, handleLangChange}) {
  return (
    <Box ml={2} mb={4}>
            <Text mb={2} fontSize="lg">
              Language:
            </Text>
            <Menu isLazy>
              <MenuButton as={Button}>{lang}</MenuButton>
              <MenuList bg="#110c1b">
                {languages.map(([language, version]) => (
                  <MenuItem
                    key={lang}
                    color={lang === language ? ACTIVE_COLOR : ""}
                    bg={lang === language ? "gray.900" : "transparent"}
                    _hover={{
                      color: ACTIVE_COLOR,
                      bg: "gray.900",
                    }}
                    onClick={() => handleLangChange(language)}
                  >
                    {language}
                    &nbsp;
                    <Text as="span" color="gray.600" fontSize="sm">
                      ({version})
                    </Text>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
  )
}

export default LanguageOptions
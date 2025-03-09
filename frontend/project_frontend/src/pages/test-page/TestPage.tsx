import { Button, Center, MenuContent, MenuItem, MenuItemCommand, MenuRoot, MenuTrigger } from "@chakra-ui/react";

export function TestPage() {
    return (
        <Center>
            <MenuRoot>
                <MenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        Open
                    </Button>
                </MenuTrigger>
                <MenuContent>
                    <MenuItem value="new-txt-a">
                        New Text File <MenuItemCommand>⌘E</MenuItemCommand>
                    </MenuItem>
                    <MenuItem value="new-file-a">
                        New File... <MenuItemCommand>⌘N</MenuItemCommand>
                    </MenuItem>
                    <MenuItem value="new-win-a">
                        New Window <MenuItemCommand>⌘⇧N</MenuItemCommand>
                    </MenuItem>
                    <MenuItem value="open-file-a">
                        Open File... <MenuItemCommand>⌘O</MenuItemCommand>
                    </MenuItem>
                    <MenuItem value="export-a">
                        Export <MenuItemCommand>⌘S</MenuItemCommand>
                    </MenuItem>
                </MenuContent>
            </MenuRoot>
        </Center>
    );
}
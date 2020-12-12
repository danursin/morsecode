import { Form, Header, Icon, Input, Table } from "semantic-ui-react";
import { Letter, alphabet, numbers } from "../constants";
import React, { useState } from "react";

import Layout from "../components/Layout";
import { playSound } from "../services/soundService";

const Home: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playingIndex, setPlayingIndex] = useState<number>();

    const handlePlayButton = async () => {
        setIsPlaying(true);
        const characters = text.split("");
        let index = 0;
        for (const character of characters) {
            setPlayingIndex(index++);
            if (/[a-zA-Z]/.test(character)) {
                const upperCase = character.toUpperCase() as Letter;
                await playSound(`${upperCase}.ogg`);
            } else if (/[0-9]/.test(character)) {
                await playSound(`${character}.ogg`);
            } else {
                await new Promise<void>((resolve) => {
                    setTimeout(() => resolve(), 1000);
                });
            }
        }
        setIsPlaying(false);
        setPlayingIndex(undefined);
    };

    return (
        <Layout>
            <Form onSubmit={handlePlayButton}>
                <Input
                    width="14"
                    placeholder="Type to translate"
                    value={text}
                    fluid
                    onChange={(e, { value }) => setText(value)}
                    icon={<Icon link name="play" disabled={!text || isPlaying} onClick={handlePlayButton} />}
                />
            </Form>

            <Table celled unstackable>
                <Table.Body>
                    {text.split("").map((letter, index) => {
                        let value: string;

                        if (/[a-zA-Z]/.test(letter)) {
                            const upperCase = letter.toUpperCase() as Letter;
                            value = alphabet[upperCase] as string;
                        } else if (/[0-9]/.test(letter)) {
                            value = numbers[+letter];
                        } else if (letter === " ") {
                            value = "";
                        } else {
                            value = letter;
                        }

                        return (
                            <Table.Row key={index} active={playingIndex === index}>
                                <Table.Cell width="1">
                                    <Header content={letter.toUpperCase()} textAlign="center" />
                                </Table.Cell>
                                <Table.Cell width="15">
                                    <Header content={value} size="huge" />
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </Layout>
    );
};
export default Home;

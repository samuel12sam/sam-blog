import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Post } from '../types/post'
import { getAllPosts, getPost } from '../repositories/postRepository'
import Markdown from 'react-native-markdown-display';
import Head from 'expo-router/head';
import LoadingImage from '../../components/LoadingImage'
import { BASE_URL } from '../config'

import CodeHighlighter from "react-native-code-highlighter";
import { monokai,a11yDark, agate, atomOneDarkReasonable,hopscotch,dracula} from "react-syntax-highlighter/dist/esm/styles/hljs";
const codeStyle = hopscotch;
export async function generateStaticParams(): Promise<Record<string, string>[]> {
    const posts = getAllPosts();
    // Return an array of params to generate static HTML files for.
    // Each entry in the array will be a new page.
    return posts.map(post => ({ slug: post.slug }));
}




export default function PostPage() {
    const { slug } = useLocalSearchParams()
    const [post, setPost] = useState<Post>(getPost(slug as string))

    if (!post) {
        return <Text>Post not found...</Text>
    }

    const rules = {
        heading1: (node: any, children: any, parent: any, styles: any) => {
            return (
                <Text key={node.key} style={[styles.heading, styles.heading1]}>
                    {children}
                </Text>
            )
        },
        heading2: (node: any, children: any, parent: any, styles: any) =>
            <Text key={node.key} style={[styles.heading, styles.heading2]}>
                {children}
            </Text>,
        heading3: (node: any, children: any, parent: any, styles: any) =>
            <Text key={node.key} style={[styles.heading, styles.heading3]}>
                {children}
            </Text>,
        code_inline: (node: any, children: any, parent: any, styles: any) => {
            console.log('children', node.content)
            return (

                <Text key={node.key}>
                    {children}
                </Text>
            )
        },
        fence: (node: any, children: any, parent: any, styles: any) => {
            // Trim new lines off the end of code blocks because the parser sends an extra one.
            let { content } = node;
            if (typeof node.content === 'string' && node.content.charAt(node.content.length - 1) === '\n') {
                content = node.content.substring(0, node.content.length - 1);
            }
            console.log('code block content', node)

            // Replace Text component with CodeHighlighter for syntax highlighting.
            return (
                <View key={node.key} style={{marginBottom:20}}>
                    <View style={{position: 'relative', top: 23, zIndex: 99, paddingLeft: 0, paddingVertical:3, backgroundColor:'#ffffff37'}}>
                        <Text style={{ color: 'grey', textAlign:'center' }}>{node.sourceInfo}</Text>
                    </View>

                    <CodeHighlighter
                        hljsStyle={codeStyle}
                        // textStyle={{color:'red'}}
                        useInlineStyles
                        scrollViewProps={{
                            scrollEnabled:false,
                            contentContainerStyle: {width:'100%',backgroundColor:'transparent', padding:15, paddingTop:35, borderRadius:10},
                        }}
                        // textStyle={{ backgroundColor: '#00000000' }}
                        customStyle={{width:'100%', backgroundColor:'black', borderWidth: 1, borderColor: 'red', borderRadius:7}}
                        language={node.sourceInfo || 'plaintext'} // Specify the language for syntax highlighting
                    >
                        {content}
                    </CodeHighlighter>
                </View>
            );
        }

    };

    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.description} />
                <meta property="og:image" content={`${BASE_URL}${post.thumbnail}`} />
            </Head>

            <ScrollView style={{ flex: 1, backgroundColor: 'white' }} contentContainerStyle={styles.page}>
                <Stack.Screen options={{ title: post.title }} />
                <Text style={styles.title}>{post.title}</Text>
                <LoadingImage
                    source={{ uri: `${BASE_URL}${post.thumbnail}` }}
                    alt={post.title}
                    style={{ width: '100%', aspectRatio: 16 / 9 }}
                />
                <Markdown
                    style={markdownStyles}
                    rules={rules}
                >
                    {post.content}
                </Markdown>
            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    page: {
        maxWidth: 960,
        width: '100%',
        padding: 20,
        backgroundColor: 'white',
        marginHorizontal: 'auto',
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,

    },
    subtitle: {
        fontSize: 36,
        color: "#38434D",
    },





    // code_block: {
    //     ...inheritedStyles, 
    //     ...styles.code_block,
    // },
    codeContainer: {
        padding: 16,
        minWidth: "100%",
    },
    text: {
        fontSize: 16,
    },

});

const markdownStyles = StyleSheet.create({
    // Headings
    heading1: {
        flexDirection: 'row',
        fontSize: 32,
    },
    heading2: {
        flexDirection: 'row',
        fontSize: 24,
    },
    heading3: {
        flexDirection: 'row',
        fontSize: 18,
    },
    heading4: {
        flexDirection: 'row',
        fontSize: 16,
    },
    heading5: {
        flexDirection: 'row',
        fontSize: 13,
    },
    heading6: {
        flexDirection: 'row',
        fontSize: 11,
    },

    // Horizontal Rule
    hr: {
        backgroundColor: '#000000',
        height: 1,
    },

    // Emphasis
    strong: {
        fontWeight: 'bold',
    },
    em: {
        fontStyle: 'italic',
    },
    s: {
        textDecorationLine: 'line-through',
    },

    // Blockquotes
    blockquote: {
        backgroundColor: '#F5F5F5',
        borderColor: '#CCC',
        borderLeftWidth: 4,
        marginLeft: 5,
        paddingHorizontal: 5,
    },

    // Lists
    bullet_list: {},
    ordered_list: {},
    list_item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    // @pseudo class, does not have a unique render rule
    bullet_list_icon: {
        marginLeft: 10,
        marginRight: 10,
    },
    // @pseudo class, does not have a unique render rule
    bullet_list_content: {
        flex: 1,
    },
    // @pseudo class, does not have a unique render rule
    ordered_list_icon: {
        marginLeft: 10,
        marginRight: 10,
    },
    // @pseudo class, does not have a unique render rule
    ordered_list_content: {
        flex: 1,
    },

    // Code
    code_inline: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 4,
        ...Platform.select({
            ['ios']: {
                fontFamily: 'Courier',
            },
            ['android']: {
                fontFamily: 'monospace',
            },
        }),
    },
    code_block: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 4,
        ...Platform.select({
            ['ios']: {
                fontFamily: 'Courier',
            },
            ['android']: {
                fontFamily: 'monospace',
            },
        }),
    },
    fence: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 4,
        ...Platform.select({
            ['ios']: {
                fontFamily: 'Courier',
            },
            ['android']: {
                fontFamily: 'monospace',
            },
        }),
    },

    // Tables
    table: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 3,
    },
    thead: {},
    tbody: {},
    th: {
        flex: 1,
        padding: 5,
    },
    tr: {
        borderBottomWidth: 1,
        borderColor: '#000000',
        flexDirection: 'row',
    },
    td: {
        flex: 1,
        padding: 5,
    },

    // Links
    link: {
        textDecorationLine: 'underline',
    },
    blocklink: {
        flex: 1,
        borderColor: '#000000',
        borderBottomWidth: 1,
    },

    // Images
    image: {
        flex: 1,
    },

    // Text Output
    text: {},
    textgroup: {},
    paragraph: {
        marginTop: 10,
        marginBottom: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
    },
    hardbreak: {
        width: '100%',
        height: 1,
    },
    softbreak: {},

    // Believe these are never used but retained for completeness
    pre: {},
    inline: {},
    span: {},
});
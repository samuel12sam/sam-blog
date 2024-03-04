import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Post } from '../types/post'
import { getAllPosts, getPost } from '../repositories/postRepository'
import Markdown from 'react-native-markdown-display';


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


    return (
        <ScrollView style={{flex:1, backgroundColor:'white'}} contentContainerStyle={styles.page}>
            <Stack.Screen options={{ title: post.title }} />
            <Text style={styles.title}>{post.title}</Text>
            <Markdown>
                {post.content}
            </Markdown>
        </ScrollView>
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
})
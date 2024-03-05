import { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { getAllPosts } from "../repositories/postRepository";
import { Post } from "../types/post";
import LoadingImage from "../../components/LoadingImage";
import { Link } from "expo-router";

export default function Page() {
  const [allPosts, setAllPosts] = useState<Post[]>(getAllPosts())


//Set up EAS updates to not have to always rebuild the project when writing new posts.

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <FlatList
          data={allPosts}
          renderItem={({ item }) => {
            return (
              <View style={styles.postItem}>
                <LoadingImage
                  style={styles.postItemThumbnail}
                  alt={item.title}
                  source={{ uri: item.thumbnail }}
                  resizeMode="cover"
                  activityIndicatorSize={'large'}
                />
                <View style={styles.postItemInfo}>
                  <Link href={`${item.slug}`} style={styles.postItemTitle}>{item.title}</Link>
                  <Text numberOfLines={3} style={styles.postItemDescription}>{item.description}</Text>
                  <View style={styles.postItemTags}>{item.tags.map((tag, index) =>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} key={`${tag}-Index${index}`}>
                      <Text style={styles.postItemTag}>{tag}</Text>
                      <Text>{index == item.tags.length - 1 ? '' : ' - '}</Text>
                    </View>
                  )}
                  </View>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
              </View>
            )
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
  main: {
    // justifyContent: "center",
    flex:1,
    // marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  postItem: {
    flexDirection: 'row',
    marginVertical:7
  },
  postItemThumbnail: {
    width: 140,
    height: 100,
  },
  postItemInfo: {
    flexDirection: 'column',
 
  },
  postItemDescription: {
    fontSize: 16,
  },
  postItemTags: {
    flexDirection: 'row',
  },
  postItemTag: {
    backgroundColor: 'limegreen',
    padding: 5,
    textAlign: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
  postItemTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  date: {
    fontSize: 14,
    color: '#888888ff',

  }
});

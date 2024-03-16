import { useState } from "react";
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { getAllPosts } from "../repositories/postRepository";
import { Post } from "../types/post";
import LoadingImage from "../../components/LoadingImage";
import { Link, useRouter } from "expo-router";
import { BASE_URL } from "../config";

export default function Page() {
  const [allPosts, setAllPosts] = useState<Post[]>(getAllPosts())
  const router = useRouter()

//Set up EAS updates to not have to always rebuild the project when writing new posts.

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {/* <LoadingImage 
          alt="randomImage"
          source={{uri:`https://www.investopedia.com/thmb/CSgAqzy4W_nUzZhrsJJOePDJ92k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hmo.asp-Final-9f9b68a2060f44c2b28782a83e14764a.jpg`}}
        /> */}
        <FlatList
          data={allPosts}
          renderItem={({ item }) => {
            return (
              <Pressable style={styles.postItem} onPress={()=>router.navigate(`${BASE_URL}${item.slug}`)}>
                <LoadingImage
                  style={styles.postItemThumbnail}
                  alt={item.title}
                  source={{ uri: `${item.thumbnail}` }}
                  resizeMode="cover"
                  activityIndicatorSize={'large'}
                />
                <View style={styles.postItemInfo}>
                  <Text style={styles.postItemTitle}>{item.title}</Text>
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
              </Pressable>
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

import { Post } from "../types/post";


const post: Post = {
    slug: 'post3',
    date: '2024-02-28T13:27:28Z',
    title: 'Third Post',
    description:'Another well written description',
    tags:['Tutorial', 'Web Development'],
    thumbnail:'/thumbnails/post3.jpeg',
    content: `
# Sunt erat verus undis Achaidas

## In timor spissa

Lorem markdownum, in habebat solus mota guttura nymphae, [si](http://alta.net/).
Spina stagna, [ancora patrium](http://sede-dis.net/sol) est mansit Delphice
confessaque ineo canitiemque! Aiax opertum, seminaque iunxit soleat, est colebat
virique. Blandis pavens cur et numero, vestrum contemptaque collo redeuntibus
aede mens, sed. Fer uni: de nihil, sacra quos illi Pallada.

\`\`\`tsx
import { View, Text } from "react-native"

/*This is an extremely long comment that i've written to see what happens if this goes on and on and on and on!*/

export default myApp() { 
    
    const hey = 'yoyo'

    return(
        <View>
            <Text>{hey}</Text>
        </View>
    )
}
\`\`\`

## Per carmen intrata iram

Una [sit](http://www.artus-an.com/) currus, nantis. Erat ait fulgura acumine
coniugiumne tamen ius. Meo aevo: non **usus** aequore fecit meo vipereos avidum,
hoc, est abiit perdam? Undis rictus huc versatus; exposcere artes tenentem
nemora quorum et funda: ferebat portusque *nec*.

- Per non cunctos tela serta obit adhuc
- Sustinet intendit Eurytion prius
- Odit muta

## Fragmina molitor fateor se adfuit ambobus et

Neque dies nescitve recens ore visus fama tenet o addidit tumere et, protegit,
Belo segetes, Stygias gradieris. Feritatis accepti. Sed *bis* aequoribus eminet
siqua effigiem Palladaque dabat amore manus nimis: minus coeperunt miscet
Eumenidum Troianis facta moritura, pro. Si summisque palmis, sedes stabit
iactarique mitius ponunt dixisse cum effluxere dabitis sine faciem terque
falsoque et? Partes abdidit: suos sed cava extemplo possim.

## Conlapsa ad moverat ferro

Cornu non canum fabula veloces Iam: potuit terram sanguinis. Laedi exiguo nec
est sinus gratus **infamataeque** calidus sua donasse ille tacti at victrix, est
tuas tellus! Longa Achivi me quoque famem habitus sistetur; amori gravi
*membris* per segnem *mores*, laticemque gelido petentem.

Nam vicisse sparsaque adspergine conducat, patris pater sunt nota moneo equidem,
est adporrectumque incerti revertar de. Voluisti Pallas turbam, miracula
mearent, inponit fraudes lympha Lycia haec!
    `,
};

export default post;
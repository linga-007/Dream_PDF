import 'package:flutter/material.dart';
import 'package:project/pages/pdf.dart';

class File extends StatefulWidget {
  File({super.key, required this.name});
  String name;

  @override
  State<File> createState() => _FileState();
}

class _FileState extends State<File> {

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: (){
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => Pdf(text: "In a quaint village nestled at the foot of the Misty Mountains, there lived a young girl named Elara. She had always been fascinated by the tales of the Enchanted Forest, a mysterious and magical place said to lie just beyond the mountains. The villagers often spoke of it in hushed tones, sharing stories of fantastical creatures and ancient magic that thrived within its depths. Despite their warnings, Elara’s curiosity grew with each passing day.One crisp autumn morning, Elara decided it was time to see the Enchanted Forest for herself. She packed a small satchel with some food, a flask of water, and her grandmother’s old compass. With a heart full of excitement and a hint of trepidation, she set off towards the mountains. The journey was long and arduous. Elara climbed steep paths and crossed icy streams, but her determination never wavered. As the sun began to set, casting a golden glow over the peaks, she finally reached the edge of the Enchanted Forest. The air was thick with the scent of pine and moss, and the trees stood tall and proud, their leaves shimmering with a silvery light. Elara took a deep breath and stepped into the forest. To her amazement, the stories were true. The forest was alive with magic. Flowers glowed in vibrant colors, and tiny, luminescent creatures flitted through the air. As she walked deeper into the forest, she felt a strange sense of calm and belonging. Suddenly, Elara heard a soft, melodic voice singing a hauntingly beautiful tune. She followed the sound until she came upon a clearing where a magnificent tree stood. Its trunk was wide and gnarled, and its branches stretched high into the sky, covered in twinkling lights. At the base of the tree sat a woman with flowing silver hair and eyes that sparkled like stars. Elara spent the following days learning from Lyria and the creatures of the forest. She discovered how to communicate with animals, heal plants, and harness the magic that flowed through the land. She became a trusted guardian, and the forest flourished under her care. Years passed, and Elara grew into a wise and powerful protector of the Enchanted Forest. The villagers no longer spoke of the forest with fear but with reverence and respect.",),
          ), 
        );
      },
      child: Padding(
        padding: const EdgeInsets.all(5),
        child: Container(
          height: 60,
          width: 500,
          decoration: BoxDecoration(
            color: Color(0xffC6CF9B),
            border: Border.all(color: Color(0xff485551)),
            borderRadius: BorderRadius.circular(15)
          ),
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(children: [
                  Icon(Icons.description_outlined, size: 40, color: Color(0xff485551)),
                  SizedBox(width: 20,),
                  Text(
                    widget.name,
                    style: TextStyle(
                      fontSize: 17
                    ),
                  )
                ],),
                Icon(Icons.info_rounded, size: 30, color: Color(0xff485551))
              ],
            )
          ),
        ),
      ),
    );
  }
}
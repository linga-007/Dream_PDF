import 'package:flutter/material.dart';
import 'package:project/components/list.dart';

class DrawerComponent extends StatelessWidget {
  const DrawerComponent({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: Color(0xfff1ffde),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            children: [
              DrawerHeader(
            child: Center(
              child: Icon(
                Icons.picture_as_pdf,
                size: 100,
                color: Color(0xff485551),
                ),
            ),
          ),
          SizedBox(height: 25),
          List(
            text: "Help & Support",
            icon: Icons.headset_mic,
            onTap: ()=> Navigator.pop(context),
          ),
          List(
            text: "FAQs",
            icon: Icons.question_answer,
            onTap: (){
              Navigator.pop(context);
            }
          ),
          List(
            text: "Feedback",
            icon: Icons.feedback_outlined,
            onTap: (){
              Navigator.pop(context);
            }
          ),
          List(
            text: "Settings",
            icon: Icons.settings,
            onTap: (){
              Navigator.pop(context);
            }
          ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.only(bottom: 25),
            child: List(
              text: "Exit",
              icon: Icons.logout,
              onTap: (){
                Navigator.pop(context);
              }
            ),
          ),
        ],
      ),
    );
  }
}
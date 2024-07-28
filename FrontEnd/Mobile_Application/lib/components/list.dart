import 'package:flutter/material.dart';

class List extends StatelessWidget {
  final String text;
  final IconData icon;
  final void Function()? onTap;
  const List({super.key, required this.text, required this.icon, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left:25),
      child: ListTile(
        leading: Icon(
          icon,
          color: Color(0xff485551),
        ),
        title: Text(
          text,
          style: TextStyle(
            fontSize: 17
          ),
        ),
        onTap: onTap,
      ),
    );
  }
}
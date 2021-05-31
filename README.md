# booking-web-mobile

web app:
i create a login, with jwt, a seller should login first, then they can see their schedules and the new requests.
by default all the slots are available.
a seller can double click on a slot thats not already filled, and they can make it unavailable, and they can also make it available again.

mobile app:
first all the sellers are available to everyone,and using pagination to show them, and with search bar as requested,  but once you click on book and you're not signed in, it app asks you to sign in first, and once you sign in you can see additional tab which shows only signed in user appoingments.
once you click on book, of any seller, it will take you to details page where you will see a calendar showing all the appointments of that seller, and those appointments that are not with you, are shown busy, it can be set by the seller it self like mentioned above or it can be actual appointment with another buyer but wont show it to you.  
then to book an appointment you can click on any slot of the day you want then you choose the time and book it, and it will be added as a pending.


backend.
used node express as requested, and mongodb for db.

the database, i have 2 collection, one for users and the other for appointments, and you can see the model in backend folder. i preffiled the db on my localmachine with users before using them. 
when filling locally , users have role which can be either "buyer" or "seller".
and appointments have status attribute which can be either "approved", "rejected" or "busy", and busy refers to when a seller makes a slot unavailable, in case you'd like to try it with postman.

the only thing that hasnt been done was using mongodb realm db to keep cross platform synced.

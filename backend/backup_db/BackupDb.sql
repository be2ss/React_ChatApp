PGDMP     5    )            	    z           chat_database    14.5    14.5                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16402    chat_database    DATABASE     i   CREATE DATABASE chat_database WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'French_France.1252';
    DROP DATABASE chat_database;
                root    false            ?            1259    16450    messages    TABLE     ?   CREATE TABLE public.messages (
    id integer NOT NULL,
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    content text NOT NULL,
    "timestamp" timestamp without time zone NOT NULL
);
    DROP TABLE public.messages;
       public         heap    postgres    false                       0    0    TABLE messages    ACL     ,   GRANT ALL ON TABLE public.messages TO root;
          public          postgres    false    211            ?            1259    16467    messages_id_seq    SEQUENCE     ?   ALTER TABLE public.messages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    211            ?            1259    16417    users_user_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false                       0    0    SEQUENCE users_user_id_seq    ACL     8   GRANT ALL ON SEQUENCE public.users_user_id_seq TO root;
          public          postgres    false    209            ?            1259    16418    users    TABLE     !  CREATE TABLE public.users (
    user_id integer DEFAULT nextval('public.users_user_id_seq'::regclass) NOT NULL,
    name character varying(200) NOT NULL,
    surname character varying(200) NOT NULL,
    mail character varying(200) NOT NULL,
    password character varying(200) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    209                       0    0    TABLE users    ACL     )   GRANT ALL ON TABLE public.users TO root;
          public          postgres    false    210            ?            1259    16468    users_avatar    TABLE     \   CREATE TABLE public.users_avatar (
    id integer NOT NULL,
    avatar_url text NOT NULL
);
     DROP TABLE public.users_avatar;
       public         heap    postgres    false                       0    0    TABLE users_avatar    ACL     0   GRANT ALL ON TABLE public.users_avatar TO root;
          public          postgres    false    213            ?          0    16450    messages 
   TABLE DATA           T   COPY public.messages (id, sender_id, receiver_id, content, "timestamp") FROM stdin;
    public          postgres    false    211   ?       ?          0    16418    users 
   TABLE DATA           G   COPY public.users (user_id, name, surname, mail, password) FROM stdin;
    public          postgres    false    210   m       ?          0    16468    users_avatar 
   TABLE DATA           6   COPY public.users_avatar (id, avatar_url) FROM stdin;
    public          postgres    false    213          	           0    0    messages_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.messages_id_seq', 25, true);
          public          postgres    false    212            
           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 8, true);
          public          postgres    false    209            i           2606    16456    messages messages_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    211            k           2606    16474    users_avatar users_avatar_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.users_avatar
    ADD CONSTRAINT users_avatar_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.users_avatar DROP CONSTRAINT users_avatar_pkey;
       public            postgres    false    213            g           2606    16425    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    210            n           2606    16475    users_avatar id    FK CONSTRAINT     n   ALTER TABLE ONLY public.users_avatar
    ADD CONSTRAINT id FOREIGN KEY (id) REFERENCES public.users(user_id);
 9   ALTER TABLE ONLY public.users_avatar DROP CONSTRAINT id;
       public          postgres    false    210    213    3175            m           2606    16462    messages receiver_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT receiver_id FOREIGN KEY (receiver_id) REFERENCES public.users(user_id) NOT VALID;
 >   ALTER TABLE ONLY public.messages DROP CONSTRAINT receiver_id;
       public          postgres    false    3175    210    211            l           2606    16457    messages sender_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT sender_id FOREIGN KEY (sender_id) REFERENCES public.users(user_id) NOT VALID;
 <   ALTER TABLE ONLY public.messages DROP CONSTRAINT sender_id;
       public          postgres    false    210    211    3175            ?   ?   x???;?@?z}
.@4?????	E???9??R???\>?0????m?Vd?h?f?-?????Pُ_????6????????????+?tU\??!?S??f?K?В???* ?*MP???~?O? ?	?a?      ?   ?   x?Mͻ?0D?z?1?x?$?"???4?B??v?????2???٠c36???Ѡ<5?B9?^B15?"???m?IHk??V?m????Yp;\H???NK?G???N4ό??R?????L)?5?R???X????0?FYӣq?? P7      ?   ?   x????J?0??ͻ$3IӘ
⥰W? ??ٴM?6!??Ƿ??e?\̙o??S)1????2?ї??5?d?Z?Z?T?e?_?gI?OJ?J)-??4`%?A????3[?nה?K~?N?)>??z?
?J?}?
?T\?c??ж?S?\?\)???i*?c7???????9??鐘_?!?{??]?k???׈"?<?us?z?t?M????У?!??H?!??u?     
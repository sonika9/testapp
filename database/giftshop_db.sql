--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6
-- Dumped by pg_dump version 12.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: lizzette
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.categories OWNER TO lizzette;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: lizzette
--

ALTER TABLE public.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: products; Type: TABLE; Schema: public; Owner: lizzette
--

CREATE TABLE public.products (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    price double precision NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    image_path character varying(255),
    category_id integer NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.products OWNER TO lizzette;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: lizzette
--

ALTER TABLE public.products ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: lizzette
--

CREATE TABLE public.transactions (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    total double precision,
    response text
);


ALTER TABLE public.transactions OWNER TO lizzette;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: lizzette
--

ALTER TABLE public.transactions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: lizzette
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    level smallint NOT NULL
);


ALTER TABLE public.users OWNER TO lizzette;

--
-- Name: users_id_seq1; Type: SEQUENCE; Schema: public; Owner: lizzette
--

CREATE SEQUENCE public.users_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq1 OWNER TO lizzette;

--
-- Name: users_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: lizzette
--

ALTER SEQUENCE public.users_id_seq1 OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: lizzette
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq1'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: lizzette
--

COPY public.categories (id, name) FROM stdin;
1	gifts
2	music
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: lizzette
--

COPY public.products (id, name, description, price, created_at, image_path, category_id, updated_at) FROM stdin;
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: lizzette
--

COPY public.transactions (id, user_id, created_at, updated_at, total, response) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: lizzette
--

COPY public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, level) FROM stdin;
20	admintest	admintest@test.com	\N	$2y$10$.qYwrIi8n6/Q5WdFyvBAeOOmMSaXmtHjMmnrfUKtX1.mjKDtgM7Cq	\N	2021-09-27 03:04:46	2021-09-27 03:04:46	2
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lizzette
--

SELECT pg_catalog.setval('public.categories_id_seq', 2, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lizzette
--

SELECT pg_catalog.setval('public.products_id_seq', 53, true);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lizzette
--

SELECT pg_catalog.setval('public.transactions_id_seq', 30, true);


--
-- Name: users_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: lizzette
--

SELECT pg_catalog.setval('public.users_id_seq1', 20, true);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: lizzette
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: lizzette
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--


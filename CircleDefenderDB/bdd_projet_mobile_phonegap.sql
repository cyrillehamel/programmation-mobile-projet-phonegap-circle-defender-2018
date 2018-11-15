--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 11.1 (Debian 11.1-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: mode_de_jeu; Type: TABLE; Schema: public; Owner: appcircledefender
--

CREATE TABLE public.mode_de_jeu (
    id integer NOT NULL,
    nom text
);


ALTER TABLE public.mode_de_jeu OWNER TO appcircledefender;

--
-- Name: mode_de_jeu_id_seq; Type: SEQUENCE; Schema: public; Owner: appcircledefender
--

CREATE SEQUENCE public.mode_de_jeu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mode_de_jeu_id_seq OWNER TO appcircledefender;

--
-- Name: mode_de_jeu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appcircledefender
--

ALTER SEQUENCE public.mode_de_jeu_id_seq OWNED BY public.mode_de_jeu.id;


--
-- Name: personnage; Type: TABLE; Schema: public; Owner: appcircledefender
--

CREATE TABLE public.personnage (
    id integer NOT NULL,
    taille_bouclier double precision
);


ALTER TABLE public.personnage OWNER TO appcircledefender;

--
-- Name: personnage_id_seq; Type: SEQUENCE; Schema: public; Owner: appcircledefender
--

CREATE SEQUENCE public.personnage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.personnage_id_seq OWNER TO appcircledefender;

--
-- Name: personnage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appcircledefender
--

ALTER SEQUENCE public.personnage_id_seq OWNED BY public.personnage.id;


--
-- Name: score; Type: TABLE; Schema: public; Owner: appcircledefender
--

CREATE TABLE public.score (
    id integer NOT NULL,
    score integer,
    id_utilisateur integer,
    id_mode_de_jeu integer,
    id_personnage integer
);


ALTER TABLE public.score OWNER TO appcircledefender;

--
-- Name: score_id_seq; Type: SEQUENCE; Schema: public; Owner: appcircledefender
--

CREATE SEQUENCE public.score_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.score_id_seq OWNER TO appcircledefender;

--
-- Name: score_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appcircledefender
--

ALTER SEQUENCE public.score_id_seq OWNED BY public.score.id;


--
-- Name: utilisateur; Type: TABLE; Schema: public; Owner: appcircledefender
--

CREATE TABLE public.utilisateur (
    id integer NOT NULL,
    mail text,
    mot_de_passe text,
    pseudonyme text
);


ALTER TABLE public.utilisateur OWNER TO appcircledefender;

--
-- Name: utilisateur_id_seq; Type: SEQUENCE; Schema: public; Owner: appcircledefender
--

CREATE SEQUENCE public.utilisateur_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.utilisateur_id_seq OWNER TO appcircledefender;

--
-- Name: utilisateur_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appcircledefender
--

ALTER SEQUENCE public.utilisateur_id_seq OWNED BY public.utilisateur.id;


--
-- Name: mode_de_jeu id; Type: DEFAULT; Schema: public; Owner: appcircledefender
--

ALTER TABLE ONLY public.mode_de_jeu ALTER COLUMN id SET DEFAULT nextval('public.mode_de_jeu_id_seq'::regclass);


--
-- Name: personnage id; Type: DEFAULT; Schema: public; Owner: appcircledefender
--

ALTER TABLE ONLY public.personnage ALTER COLUMN id SET DEFAULT nextval('public.personnage_id_seq'::regclass);


--
-- Name: score id; Type: DEFAULT; Schema: public; Owner: appcircledefender
--

ALTER TABLE ONLY public.score ALTER COLUMN id SET DEFAULT nextval('public.score_id_seq'::regclass);


--
-- Name: utilisateur id; Type: DEFAULT; Schema: public; Owner: appcircledefender
--

ALTER TABLE ONLY public.utilisateur ALTER COLUMN id SET DEFAULT nextval('public.utilisateur_id_seq'::regclass);


--
-- Data for Name: mode_de_jeu; Type: TABLE DATA; Schema: public; Owner: appcircledefender
--

COPY public.mode_de_jeu (id, nom) FROM stdin;
\.


--
-- Data for Name: personnage; Type: TABLE DATA; Schema: public; Owner: appcircledefender
--

COPY public.personnage (id, taille_bouclier) FROM stdin;
\.


--
-- Data for Name: score; Type: TABLE DATA; Schema: public; Owner: appcircledefender
--

COPY public.score (id, score, id_utilisateur, id_mode_de_jeu, id_personnage) FROM stdin;
\.


--
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: public; Owner: appcircledefender
--

COPY public.utilisateur (id, mail, mot_de_passe, pseudonyme) FROM stdin;
\.


--
-- Name: mode_de_jeu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appcircledefender
--

SELECT pg_catalog.setval('public.mode_de_jeu_id_seq', 1, false);


--
-- Name: personnage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appcircledefender
--

SELECT pg_catalog.setval('public.personnage_id_seq', 1, false);


--
-- Name: score_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appcircledefender
--

SELECT pg_catalog.setval('public.score_id_seq', 1, false);


--
-- Name: utilisateur_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appcircledefender
--

SELECT pg_catalog.setval('public.utilisateur_id_seq', 1, false);


--
-- Name: mode_de_jeu mode_de_jeu_pkey; Type: CONSTRAINT; Schema: public; Owner: appcircledefender
--

ALTER TABLE ONLY public.mode_de_jeu
    ADD CONSTRAINT mode_de_jeu_pkey PRIMARY KEY (id);


--
-- Name: personnage personnage_pkey; Type: CONSTRAINT; Schema: public; Owner: appcircledefender
--

ALTER TABLE ONLY public.personnage
    ADD CONSTRAINT personnage_pkey PRIMARY KEY (id);


--
-- Name: score score_pkey; Type: CONSTRAINT; Schema: public; Owner: appcircledefender
--

ALTER TABLE ONLY public.score
    ADD CONSTRAINT score_pkey PRIMARY KEY (id);


--
-- Name: utilisateur utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: appcircledefender
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id);


--
-- Name: utilisateur_mail_uindex; Type: INDEX; Schema: public; Owner: appcircledefender
--

CREATE UNIQUE INDEX utilisateur_mail_uindex ON public.utilisateur USING btree (mail);


--
-- Name: score score_mode_de_jeu_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: appcircledefender
--

ALTER TABLE ONLY public.score
    ADD CONSTRAINT score_mode_de_jeu_id_fk FOREIGN KEY (id_mode_de_jeu) REFERENCES public.mode_de_jeu(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: score score_personnage_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: appcircledefender
--

ALTER TABLE ONLY public.score
    ADD CONSTRAINT score_personnage_id_fk FOREIGN KEY (id_personnage) REFERENCES public.personnage(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: score score_utilisateur_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: appcircledefender
--

ALTER TABLE ONLY public.score
    ADD CONSTRAINT score_utilisateur_id_fk FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateur(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


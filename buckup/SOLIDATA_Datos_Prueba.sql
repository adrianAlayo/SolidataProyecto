-- SOLIDATA | Base PostgreSQL con datos de prueba
-- Esquema completo + datos de demostracion + cinco instituciones ficticias CABA para probar el mapa.
-- Ejecutar sobre una base vacia en DBeaver; el usuario administrador inicia con contrasena 123.
--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_Donations_donorType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."enum_Donations_donorType" AS ENUM (
    'Institution',
    'User'
);


--
-- Name: enum_Donations_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."enum_Donations_status" AS ENUM (
    'Scheduled',
    'Delivered',
    'Not Delivered'
);


--
-- Name: enum_InstitutionsNeeds_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."enum_InstitutionsNeeds_status" AS ENUM (
    'Pending',
    'Resolved'
);


--
-- Name: enum_Institutions_institutionType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."enum_Institutions_institutionType" AS ENUM (
    'Donor',
    'Recipient',
    'Both'
);


--
-- Name: enum_Institutions_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."enum_Institutions_status" AS ENUM (
    'Active',
    'Inactive',
    'Pending'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Actions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Actions" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


--
-- Name: Actions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Actions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Actions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Actions_id_seq" OWNED BY public."Actions".id;


--
-- Name: Articles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Articles" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    category character varying(50) NOT NULL,
    variant character varying(80) NOT NULL,
    unit character varying(20) NOT NULL
);


--
-- Name: Articles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Articles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Articles_id_seq" OWNED BY public."Articles".id;


--
-- Name: DonationItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."DonationItems" (
    id integer NOT NULL,
    quantity integer NOT NULL,
    expiration_date timestamp with time zone NOT NULL,
    note character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    donation_id integer,
    article_id integer
);


--
-- Name: DonationItems_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."DonationItems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: DonationItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."DonationItems_id_seq" OWNED BY public."DonationItems".id;


--
-- Name: Donations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Donations" (
    id integer NOT NULL,
    note text,
    donation_date timestamp with time zone NOT NULL,
    status public."enum_Donations_status" DEFAULT 'Scheduled'::public."enum_Donations_status",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    responsable_user_id integer,
    donor_id integer,
    receiver_institution_id integer
);


--
-- Name: Donations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Donations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Donations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Donations_id_seq" OWNED BY public."Donations".id;


--
-- Name: Entities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Entities" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


--
-- Name: Entities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Entities_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Entities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Entities_id_seq" OWNED BY public."Entities".id;


--
-- Name: Institutions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Institutions" (
    id integer NOT NULL,
    name character varying(120) NOT NULL,
    location character varying(254) NOT NULL,
    "institutionType" public."enum_Institutions_institutionType" DEFAULT 'Recipient'::public."enum_Institutions_institutionType" NOT NULL,
    status public."enum_Institutions_status" DEFAULT 'Pending'::public."enum_Institutions_status",
    type_id integer
);


--
-- Name: InstitutionsNeeds; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."InstitutionsNeeds" (
    id integer NOT NULL,
    available integer NOT NULL,
    status public."enum_InstitutionsNeeds_status" DEFAULT 'Pending'::public."enum_InstitutionsNeeds_status" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    institution_id integer,
    article_id integer
);


--
-- Name: InstitutionsNeeds_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."InstitutionsNeeds_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: InstitutionsNeeds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."InstitutionsNeeds_id_seq" OWNED BY public."InstitutionsNeeds".id;


--
-- Name: Institutions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Institutions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Institutions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Institutions_id_seq" OWNED BY public."Institutions".id;


--
-- Name: Inventories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Inventories" (
    id integer NOT NULL,
    available integer NOT NULL,
    area character varying(150) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    donation_item_id integer
);


--
-- Name: Inventories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Inventories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Inventories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Inventories_id_seq" OWNED BY public."Inventories".id;


--
-- Name: Permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Permissions" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    entity_id integer,
    action_id integer
);


--
-- Name: Permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Permissions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Permissions_id_seq" OWNED BY public."Permissions".id;


--
-- Name: RolePermissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."RolePermissions" (
    role_id integer NOT NULL,
    permission_id integer NOT NULL
);


--
-- Name: Roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Roles" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


--
-- Name: Roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Roles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Roles_id_seq" OWNED BY public."Roles".id;


--
-- Name: Types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Types" (
    id integer NOT NULL,
    name character varying(120) NOT NULL
);


--
-- Name: Types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Types_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Types_id_seq" OWNED BY public."Types".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(100) NOT NULL,
    phone character varying(20) NOT NULL,
    is_active boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    role_id integer,
    institution_id integer
);


--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Actions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Actions" ALTER COLUMN id SET DEFAULT nextval('public."Actions_id_seq"'::regclass);


--
-- Name: Articles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Articles" ALTER COLUMN id SET DEFAULT nextval('public."Articles_id_seq"'::regclass);


--
-- Name: DonationItems id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DonationItems" ALTER COLUMN id SET DEFAULT nextval('public."DonationItems_id_seq"'::regclass);


--
-- Name: Donations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Donations" ALTER COLUMN id SET DEFAULT nextval('public."Donations_id_seq"'::regclass);


--
-- Name: Entities id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Entities" ALTER COLUMN id SET DEFAULT nextval('public."Entities_id_seq"'::regclass);


--
-- Name: Institutions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Institutions" ALTER COLUMN id SET DEFAULT nextval('public."Institutions_id_seq"'::regclass);


--
-- Name: InstitutionsNeeds id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."InstitutionsNeeds" ALTER COLUMN id SET DEFAULT nextval('public."InstitutionsNeeds_id_seq"'::regclass);


--
-- Name: Inventories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Inventories" ALTER COLUMN id SET DEFAULT nextval('public."Inventories_id_seq"'::regclass);


--
-- Name: Permissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Permissions" ALTER COLUMN id SET DEFAULT nextval('public."Permissions_id_seq"'::regclass);


--
-- Name: Roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Roles" ALTER COLUMN id SET DEFAULT nextval('public."Roles_id_seq"'::regclass);


--
-- Name: Types id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Types" ALTER COLUMN id SET DEFAULT nextval('public."Types_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Actions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Actions" VALUES (1, 'CREATE', 'Crear un recurso');
INSERT INTO public."Actions" VALUES (2, 'READ', 'Leer un recurso');
INSERT INTO public."Actions" VALUES (3, 'UPDATE', 'Modificar un recurso');
INSERT INTO public."Actions" VALUES (4, 'DELETE', 'Eliminar un recurso');
INSERT INTO public."Actions" VALUES (5, 'LIST', 'Listar múltiples recursos');
INSERT INTO public."Actions" VALUES (6, 'APPROVE', 'Aprobar solicitudes');
INSERT INTO public."Actions" VALUES (7, 'ASSIGN', 'Asignar roles o permisos');
INSERT INTO public."Actions" VALUES (9, 'CHANGE_STATUS', 'Cambiar estado de un recurso');


--
-- Data for Name: Articles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Articles" VALUES (6, 'Fideos', 'Alimentos', 'Spaghetti', 'kg');
INSERT INTO public."Articles" VALUES (7, 'Fideos', 'Alimentos', 'Coditos', 'kg');
INSERT INTO public."Articles" VALUES (8, 'Leche', 'Bebidas', 'Entera larga vida', 'litro');
INSERT INTO public."Articles" VALUES (9, 'Leche', 'Bebidas', 'Descremada larga vida', 'litro');
INSERT INTO public."Articles" VALUES (10, 'Leche', 'Bebidas', 'Entera en polvo', 'kg');
INSERT INTO public."Articles" VALUES (11, 'Leche', 'Bebidas', 'Sin lactosa', 'litro');
INSERT INTO public."Articles" VALUES (12, 'Aceite', 'Alimentos', 'Girasol 1lt', 'litro');
INSERT INTO public."Articles" VALUES (13, 'Harina', 'Alimentos', '000', 'kg');
INSERT INTO public."Articles" VALUES (14, 'Harina', 'Alimentos', '0000', 'kg');
INSERT INTO public."Articles" VALUES (15, 'Azúcar', 'Alimentos', '1kg', 'kg');
INSERT INTO public."Articles" VALUES (16, 'Yerba Mate', 'Bebidas', '1kg', 'kg');
INSERT INTO public."Articles" VALUES (17, 'Galletitas', 'Alimentos', 'Agua', 'unidad');
INSERT INTO public."Articles" VALUES (18, 'Galletitas', 'Alimentos', 'Dulces', 'unidad');
INSERT INTO public."Articles" VALUES (19, 'Tomate Triturado', 'Alimentos', '520g', 'unidad');
INSERT INTO public."Articles" VALUES (20, 'Polenta', 'Alimentos', '500g', 'unidad');
INSERT INTO public."Articles" VALUES (21, 'Arvejas', 'Alimentos', 'Lata 350g', 'unidad');
INSERT INTO public."Articles" VALUES (22, 'Lentejas', 'Alimentos', '500g', 'unidad');
INSERT INTO public."Articles" VALUES (23, 'Jabón en polvo', 'Higiene', '1kg', 'kg');
INSERT INTO public."Articles" VALUES (24, 'Lavandina', 'Limpieza', '1lt', 'litro');
INSERT INTO public."Articles" VALUES (25, 'Pañales', 'Higiene', 'Talle 4', 'unidad');
INSERT INTO public."Articles" VALUES (27, 'Detergente', 'Limpieza', '500ml', 'litro');
INSERT INTO public."Articles" VALUES (5, 'Arroz', 'Alimentos', '1kg', 'Kg');


--
-- Data for Name: DonationItems; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."DonationItems" VALUES (1, 40, '2027-02-28 18:58:32.092418-03', 'Lote de Arroz 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 1, 5);
INSERT INTO public."DonationItems" VALUES (2, 47, '2027-04-06 18:58:32.092418-03', 'Lote de Fideos Spaghetti', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 1, 6);
INSERT INTO public."DonationItems" VALUES (3, 53, '2027-03-09 18:58:32.092418-03', 'Lote de Fideos Coditos', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, 7);
INSERT INTO public."DonationItems" VALUES (4, 60, '2027-04-15 18:58:32.092418-03', 'Lote de Leche Entera larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, 8);
INSERT INTO public."DonationItems" VALUES (5, 66, '2027-03-18 18:58:32.092418-03', 'Lote de Leche Descremada larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 3, 9);
INSERT INTO public."DonationItems" VALUES (6, 73, '2027-04-24 18:58:32.092418-03', 'Lote de Leche Entera en polvo', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 3, 10);
INSERT INTO public."DonationItems" VALUES (7, 79, '2027-03-27 18:58:32.092418-03', 'Lote de Leche Sin lactosa', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 11);
INSERT INTO public."DonationItems" VALUES (8, 86, '2027-05-03 18:58:32.092418-03', 'Lote de Aceite Girasol 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 12);
INSERT INTO public."DonationItems" VALUES (9, 92, '2027-04-05 18:58:32.092418-03', 'Lote de Harina 000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 5, 13);
INSERT INTO public."DonationItems" VALUES (10, 99, '2027-05-12 18:58:32.092418-03', 'Lote de Harina 0000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 5, 14);
INSERT INTO public."DonationItems" VALUES (11, 105, '2027-04-14 18:58:32.092418-03', 'Lote de Azúcar 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 6, 15);
INSERT INTO public."DonationItems" VALUES (12, 112, '2027-05-21 18:58:32.092418-03', 'Lote de Yerba Mate 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 6, 16);
INSERT INTO public."DonationItems" VALUES (13, 118, '2027-04-23 18:58:32.092418-03', 'Lote de Galletitas Agua', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 7, 17);
INSERT INTO public."DonationItems" VALUES (14, 125, '2027-05-30 18:58:32.092418-03', 'Lote de Galletitas Dulces', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 7, 18);
INSERT INTO public."DonationItems" VALUES (15, 131, '2027-05-02 18:58:32.092418-03', 'Lote de Tomate Triturado 520g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 8, 19);
INSERT INTO public."DonationItems" VALUES (16, 138, '2027-06-08 18:58:32.092418-03', 'Lote de Polenta 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 8, 20);
INSERT INTO public."DonationItems" VALUES (17, 144, '2027-05-11 18:58:32.092418-03', 'Lote de Arvejas Lata 350g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 9, 21);
INSERT INTO public."DonationItems" VALUES (18, 151, '2027-06-17 18:58:32.092418-03', 'Lote de Lentejas 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 9, 22);
INSERT INTO public."DonationItems" VALUES (19, 157, '2027-05-20 18:58:32.092418-03', 'Lote de Jabón en polvo 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 10, 23);
INSERT INTO public."DonationItems" VALUES (20, 164, '2027-06-26 18:58:32.092418-03', 'Lote de Lavandina 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 10, 24);
INSERT INTO public."DonationItems" VALUES (21, 170, '2027-05-29 18:58:32.092418-03', 'Lote de Pañales Talle 4', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 11, 25);
INSERT INTO public."DonationItems" VALUES (22, 177, '2027-07-05 18:58:32.092418-03', 'Lote de Detergente 500ml', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 11, 27);
INSERT INTO public."DonationItems" VALUES (23, 183, '2027-06-07 18:58:32.092418-03', 'Lote de Arroz 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 12, 5);
INSERT INTO public."DonationItems" VALUES (24, 190, '2027-07-14 18:58:32.092418-03', 'Lote de Fideos Spaghetti', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 12, 6);
INSERT INTO public."DonationItems" VALUES (25, 196, '2027-06-16 18:58:32.092418-03', 'Lote de Fideos Coditos', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 13, 7);
INSERT INTO public."DonationItems" VALUES (26, 22, '2027-07-23 18:58:32.092418-03', 'Lote de Leche Entera larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 13, 8);
INSERT INTO public."DonationItems" VALUES (27, 28, '2027-06-25 18:58:32.092418-03', 'Lote de Leche Descremada larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 14, 9);
INSERT INTO public."DonationItems" VALUES (28, 35, '2027-08-01 18:58:32.092418-03', 'Lote de Leche Entera en polvo', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 14, 10);
INSERT INTO public."DonationItems" VALUES (29, 41, '2027-07-04 18:58:32.092418-03', 'Lote de Leche Sin lactosa', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 15, 11);
INSERT INTO public."DonationItems" VALUES (30, 48, '2027-08-10 18:58:32.092418-03', 'Lote de Aceite Girasol 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 15, 12);
INSERT INTO public."DonationItems" VALUES (31, 54, '2027-07-13 18:58:32.092418-03', 'Lote de Harina 000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 16, 13);
INSERT INTO public."DonationItems" VALUES (32, 61, '2027-08-19 18:58:32.092418-03', 'Lote de Harina 0000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 16, 14);
INSERT INTO public."DonationItems" VALUES (33, 67, '2027-07-22 18:58:32.092418-03', 'Lote de Azúcar 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 17, 15);
INSERT INTO public."DonationItems" VALUES (34, 74, '2027-08-28 18:58:32.092418-03', 'Lote de Yerba Mate 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 17, 16);
INSERT INTO public."DonationItems" VALUES (35, 80, '2027-07-31 18:58:32.092418-03', 'Lote de Galletitas Agua', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 18, 17);
INSERT INTO public."DonationItems" VALUES (36, 87, '2027-09-06 18:58:32.092418-03', 'Lote de Galletitas Dulces', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 18, 18);
INSERT INTO public."DonationItems" VALUES (37, 93, '2027-08-09 18:58:32.092418-03', 'Lote de Tomate Triturado 520g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 19, 19);
INSERT INTO public."DonationItems" VALUES (38, 100, '2027-09-15 18:58:32.092418-03', 'Lote de Polenta 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 19, 20);
INSERT INTO public."DonationItems" VALUES (39, 106, '2027-08-18 18:58:32.092418-03', 'Lote de Arvejas Lata 350g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 20, 21);
INSERT INTO public."DonationItems" VALUES (40, 113, '2027-09-24 18:58:32.092418-03', 'Lote de Lentejas 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 20, 22);
INSERT INTO public."DonationItems" VALUES (41, 119, '2027-08-27 18:58:32.092418-03', 'Lote de Jabón en polvo 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 21, 23);
INSERT INTO public."DonationItems" VALUES (42, 126, '2027-10-03 18:58:32.092418-03', 'Lote de Lavandina 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 21, 24);
INSERT INTO public."DonationItems" VALUES (43, 132, '2027-09-05 18:58:32.092418-03', 'Lote de Pañales Talle 4', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 22, 25);
INSERT INTO public."DonationItems" VALUES (44, 139, '2027-10-12 18:58:32.092418-03', 'Lote de Detergente 500ml', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 22, 27);
INSERT INTO public."DonationItems" VALUES (45, 145, '2027-09-14 18:58:32.092418-03', 'Lote de Arroz 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 23, 5);
INSERT INTO public."DonationItems" VALUES (46, 152, '2027-10-21 18:58:32.092418-03', 'Lote de Fideos Spaghetti', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 23, 6);
INSERT INTO public."DonationItems" VALUES (47, 158, '2027-09-23 18:58:32.092418-03', 'Lote de Fideos Coditos', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 24, 7);
INSERT INTO public."DonationItems" VALUES (48, 165, '2027-10-30 18:58:32.092418-03', 'Lote de Leche Entera larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 24, 8);
INSERT INTO public."DonationItems" VALUES (49, 171, '2027-10-02 18:58:32.092418-03', 'Lote de Leche Descremada larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 25, 9);
INSERT INTO public."DonationItems" VALUES (50, 178, '2027-11-08 18:58:32.092418-03', 'Lote de Leche Entera en polvo', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 25, 10);
INSERT INTO public."DonationItems" VALUES (51, 184, '2027-10-11 18:58:32.092418-03', 'Lote de Leche Sin lactosa', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 26, 11);
INSERT INTO public."DonationItems" VALUES (52, 191, '2027-11-17 18:58:32.092418-03', 'Lote de Aceite Girasol 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 26, 12);
INSERT INTO public."DonationItems" VALUES (53, 197, '2027-10-20 18:58:32.092418-03', 'Lote de Harina 000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 27, 13);
INSERT INTO public."DonationItems" VALUES (54, 23, '2027-11-26 18:58:32.092418-03', 'Lote de Harina 0000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 27, 14);
INSERT INTO public."DonationItems" VALUES (55, 29, '2027-10-29 18:58:32.092418-03', 'Lote de Azúcar 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 28, 15);
INSERT INTO public."DonationItems" VALUES (56, 36, '2027-12-05 18:58:32.092418-03', 'Lote de Yerba Mate 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 28, 16);
INSERT INTO public."DonationItems" VALUES (57, 42, '2027-11-07 18:58:32.092418-03', 'Lote de Galletitas Agua', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 29, 17);
INSERT INTO public."DonationItems" VALUES (58, 49, '2027-12-14 18:58:32.092418-03', 'Lote de Galletitas Dulces', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 29, 18);
INSERT INTO public."DonationItems" VALUES (59, 55, '2027-11-16 18:58:32.092418-03', 'Lote de Tomate Triturado 520g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 30, 19);
INSERT INTO public."DonationItems" VALUES (60, 62, '2027-12-23 18:58:32.092418-03', 'Lote de Polenta 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 30, 20);
INSERT INTO public."DonationItems" VALUES (61, 68, '2027-11-25 18:58:32.092418-03', 'Lote de Arvejas Lata 350g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 31, 21);
INSERT INTO public."DonationItems" VALUES (62, 75, '2028-01-01 18:58:32.092418-03', 'Lote de Lentejas 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 31, 22);
INSERT INTO public."DonationItems" VALUES (63, 81, '2027-12-04 18:58:32.092418-03', 'Lote de Jabón en polvo 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 32, 23);
INSERT INTO public."DonationItems" VALUES (64, 88, '2028-01-10 18:58:32.092418-03', 'Lote de Lavandina 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 32, 24);
INSERT INTO public."DonationItems" VALUES (65, 94, '2027-12-13 18:58:32.092418-03', 'Lote de Pañales Talle 4', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 33, 25);
INSERT INTO public."DonationItems" VALUES (66, 101, '2028-01-19 18:58:32.092418-03', 'Lote de Detergente 500ml', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 33, 27);
INSERT INTO public."DonationItems" VALUES (67, 107, '2027-12-22 18:58:32.092418-03', 'Lote de Arroz 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 34, 5);
INSERT INTO public."DonationItems" VALUES (68, 114, '2028-01-28 18:58:32.092418-03', 'Lote de Fideos Spaghetti', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 34, 6);
INSERT INTO public."DonationItems" VALUES (69, 120, '2027-12-31 18:58:32.092418-03', 'Lote de Fideos Coditos', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 35, 7);
INSERT INTO public."DonationItems" VALUES (70, 127, '2028-02-06 18:58:32.092418-03', 'Lote de Leche Entera larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 35, 8);
INSERT INTO public."DonationItems" VALUES (71, 133, '2028-01-09 18:58:32.092418-03', 'Lote de Leche Descremada larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 36, 9);
INSERT INTO public."DonationItems" VALUES (72, 140, '2028-02-15 18:58:32.092418-03', 'Lote de Leche Entera en polvo', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 36, 10);
INSERT INTO public."DonationItems" VALUES (73, 146, '2028-01-18 18:58:32.092418-03', 'Lote de Leche Sin lactosa', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 37, 11);
INSERT INTO public."DonationItems" VALUES (74, 153, '2028-02-24 18:58:32.092418-03', 'Lote de Aceite Girasol 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 37, 12);
INSERT INTO public."DonationItems" VALUES (75, 159, '2028-01-27 18:58:32.092418-03', 'Lote de Harina 000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 38, 13);
INSERT INTO public."DonationItems" VALUES (76, 166, '2028-03-04 18:58:32.092418-03', 'Lote de Harina 0000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 38, 14);
INSERT INTO public."DonationItems" VALUES (77, 172, '2028-02-05 18:58:32.092418-03', 'Lote de Azúcar 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 39, 15);
INSERT INTO public."DonationItems" VALUES (78, 179, '2028-03-13 18:58:32.092418-03', 'Lote de Yerba Mate 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 39, 16);
INSERT INTO public."DonationItems" VALUES (79, 185, '2028-02-14 18:58:32.092418-03', 'Lote de Galletitas Agua', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 40, 17);
INSERT INTO public."DonationItems" VALUES (80, 192, '2028-03-22 18:58:32.092418-03', 'Lote de Galletitas Dulces', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 40, 18);
INSERT INTO public."DonationItems" VALUES (81, 198, '2028-02-23 18:58:32.092418-03', 'Lote de Tomate Triturado 520g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 41, 19);
INSERT INTO public."DonationItems" VALUES (82, 24, '2028-03-31 18:58:32.092418-03', 'Lote de Polenta 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 41, 20);
INSERT INTO public."DonationItems" VALUES (83, 30, '2028-03-03 18:58:32.092418-03', 'Lote de Arvejas Lata 350g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 42, 21);
INSERT INTO public."DonationItems" VALUES (84, 37, '2028-04-09 18:58:32.092418-03', 'Lote de Lentejas 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 42, 22);
INSERT INTO public."DonationItems" VALUES (85, 43, '2028-03-12 18:58:32.092418-03', 'Lote de Jabón en polvo 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 43, 23);
INSERT INTO public."DonationItems" VALUES (86, 50, '2028-04-18 18:58:32.092418-03', 'Lote de Lavandina 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 43, 24);
INSERT INTO public."DonationItems" VALUES (87, 56, '2028-03-21 18:58:32.092418-03', 'Lote de Pañales Talle 4', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 44, 25);
INSERT INTO public."DonationItems" VALUES (88, 63, '2028-04-27 18:58:32.092418-03', 'Lote de Detergente 500ml', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 44, 27);
INSERT INTO public."DonationItems" VALUES (89, 69, '2028-03-30 18:58:32.092418-03', 'Lote de Arroz 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 45, 5);
INSERT INTO public."DonationItems" VALUES (90, 76, '2028-05-06 18:58:32.092418-03', 'Lote de Fideos Spaghetti', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 45, 6);
INSERT INTO public."DonationItems" VALUES (91, 82, '2028-04-08 18:58:32.092418-03', 'Lote de Fideos Coditos', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 46, 7);
INSERT INTO public."DonationItems" VALUES (92, 89, '2028-05-15 18:58:32.092418-03', 'Lote de Leche Entera larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 46, 8);
INSERT INTO public."DonationItems" VALUES (93, 95, '2028-04-17 18:58:32.092418-03', 'Lote de Leche Descremada larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 47, 9);
INSERT INTO public."DonationItems" VALUES (94, 102, '2028-05-24 18:58:32.092418-03', 'Lote de Leche Entera en polvo', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 47, 10);
INSERT INTO public."DonationItems" VALUES (95, 108, '2028-04-26 18:58:32.092418-03', 'Lote de Leche Sin lactosa', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 48, 11);
INSERT INTO public."DonationItems" VALUES (96, 115, '2028-06-02 18:58:32.092418-03', 'Lote de Aceite Girasol 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 48, 12);
INSERT INTO public."DonationItems" VALUES (97, 121, '2028-05-05 18:58:32.092418-03', 'Lote de Harina 000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 49, 13);
INSERT INTO public."DonationItems" VALUES (98, 128, '2028-06-11 18:58:32.092418-03', 'Lote de Harina 0000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 49, 14);
INSERT INTO public."DonationItems" VALUES (99, 134, '2028-05-14 18:58:32.092418-03', 'Lote de Azúcar 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 50, 15);
INSERT INTO public."DonationItems" VALUES (100, 141, '2028-06-20 18:58:32.092418-03', 'Lote de Yerba Mate 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 50, 16);
INSERT INTO public."DonationItems" VALUES (101, 147, '2028-05-23 18:58:32.092418-03', 'Lote de Galletitas Agua', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 51, 17);
INSERT INTO public."DonationItems" VALUES (102, 154, '2028-06-29 18:58:32.092418-03', 'Lote de Galletitas Dulces', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 51, 18);
INSERT INTO public."DonationItems" VALUES (103, 160, '2028-06-01 18:58:32.092418-03', 'Lote de Tomate Triturado 520g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 52, 19);
INSERT INTO public."DonationItems" VALUES (104, 167, '2027-01-15 18:58:32.092418-03', 'Lote de Polenta 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 52, 20);
INSERT INTO public."DonationItems" VALUES (105, 173, '2028-06-10 18:58:32.092418-03', 'Lote de Arvejas Lata 350g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 53, 21);
INSERT INTO public."DonationItems" VALUES (106, 180, '2027-01-24 18:58:32.092418-03', 'Lote de Lentejas 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 53, 22);
INSERT INTO public."DonationItems" VALUES (107, 186, '2028-06-19 18:58:32.092418-03', 'Lote de Jabón en polvo 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 54, 23);
INSERT INTO public."DonationItems" VALUES (108, 193, '2027-02-02 18:58:32.092418-03', 'Lote de Lavandina 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 54, 24);
INSERT INTO public."DonationItems" VALUES (109, 199, '2028-06-28 18:58:32.092418-03', 'Lote de Pañales Talle 4', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 55, 25);
INSERT INTO public."DonationItems" VALUES (110, 25, '2027-02-11 18:58:32.092418-03', 'Lote de Detergente 500ml', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 55, 27);
INSERT INTO public."DonationItems" VALUES (111, 31, '2027-01-14 18:58:32.092418-03', 'Lote de Arroz 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 56, 5);
INSERT INTO public."DonationItems" VALUES (112, 38, '2027-02-20 18:58:32.092418-03', 'Lote de Fideos Spaghetti', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 56, 6);
INSERT INTO public."DonationItems" VALUES (113, 44, '2027-01-23 18:58:32.092418-03', 'Lote de Fideos Coditos', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 57, 7);
INSERT INTO public."DonationItems" VALUES (114, 51, '2027-03-01 18:58:32.092418-03', 'Lote de Leche Entera larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 57, 8);
INSERT INTO public."DonationItems" VALUES (115, 57, '2027-02-01 18:58:32.092418-03', 'Lote de Leche Descremada larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 58, 9);
INSERT INTO public."DonationItems" VALUES (116, 64, '2027-03-10 18:58:32.092418-03', 'Lote de Leche Entera en polvo', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 58, 10);
INSERT INTO public."DonationItems" VALUES (117, 70, '2027-02-10 18:58:32.092418-03', 'Lote de Leche Sin lactosa', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 59, 11);
INSERT INTO public."DonationItems" VALUES (118, 77, '2027-03-19 18:58:32.092418-03', 'Lote de Aceite Girasol 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 59, 12);
INSERT INTO public."DonationItems" VALUES (119, 83, '2027-02-19 18:58:32.092418-03', 'Lote de Harina 000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 60, 13);
INSERT INTO public."DonationItems" VALUES (120, 90, '2027-03-28 18:58:32.092418-03', 'Lote de Harina 0000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 60, 14);
INSERT INTO public."DonationItems" VALUES (121, 96, '2027-02-28 18:58:32.092418-03', 'Lote de Azúcar 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 61, 15);
INSERT INTO public."DonationItems" VALUES (122, 103, '2027-04-06 18:58:32.092418-03', 'Lote de Yerba Mate 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 61, 16);
INSERT INTO public."DonationItems" VALUES (123, 109, '2027-03-09 18:58:32.092418-03', 'Lote de Galletitas Agua', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 62, 17);
INSERT INTO public."DonationItems" VALUES (124, 116, '2027-04-15 18:58:32.092418-03', 'Lote de Galletitas Dulces', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 62, 18);
INSERT INTO public."DonationItems" VALUES (125, 122, '2027-03-18 18:58:32.092418-03', 'Lote de Tomate Triturado 520g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 63, 19);
INSERT INTO public."DonationItems" VALUES (126, 129, '2027-04-24 18:58:32.092418-03', 'Lote de Polenta 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 63, 20);
INSERT INTO public."DonationItems" VALUES (127, 135, '2027-03-27 18:58:32.092418-03', 'Lote de Arvejas Lata 350g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 64, 21);
INSERT INTO public."DonationItems" VALUES (128, 142, '2027-05-03 18:58:32.092418-03', 'Lote de Lentejas 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 64, 22);
INSERT INTO public."DonationItems" VALUES (129, 148, '2027-04-05 18:58:32.092418-03', 'Lote de Jabón en polvo 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 65, 23);
INSERT INTO public."DonationItems" VALUES (130, 155, '2027-05-12 18:58:32.092418-03', 'Lote de Lavandina 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 65, 24);
INSERT INTO public."DonationItems" VALUES (131, 161, '2027-04-14 18:58:32.092418-03', 'Lote de Pañales Talle 4', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 66, 25);
INSERT INTO public."DonationItems" VALUES (132, 168, '2027-05-21 18:58:32.092418-03', 'Lote de Detergente 500ml', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 66, 27);
INSERT INTO public."DonationItems" VALUES (133, 174, '2027-04-23 18:58:32.092418-03', 'Lote de Arroz 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 67, 5);
INSERT INTO public."DonationItems" VALUES (134, 181, '2027-05-30 18:58:32.092418-03', 'Lote de Fideos Spaghetti', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 67, 6);
INSERT INTO public."DonationItems" VALUES (135, 187, '2027-05-02 18:58:32.092418-03', 'Lote de Fideos Coditos', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 68, 7);
INSERT INTO public."DonationItems" VALUES (136, 194, '2027-06-08 18:58:32.092418-03', 'Lote de Leche Entera larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 68, 8);
INSERT INTO public."DonationItems" VALUES (137, 200, '2027-05-11 18:58:32.092418-03', 'Lote de Leche Descremada larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 69, 9);
INSERT INTO public."DonationItems" VALUES (138, 26, '2027-06-17 18:58:32.092418-03', 'Lote de Leche Entera en polvo', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 69, 10);
INSERT INTO public."DonationItems" VALUES (139, 32, '2027-05-20 18:58:32.092418-03', 'Lote de Leche Sin lactosa', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 70, 11);
INSERT INTO public."DonationItems" VALUES (140, 39, '2027-06-26 18:58:32.092418-03', 'Lote de Aceite Girasol 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 70, 12);
INSERT INTO public."DonationItems" VALUES (141, 45, '2027-05-29 18:58:32.092418-03', 'Lote de Harina 000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 71, 13);
INSERT INTO public."DonationItems" VALUES (142, 52, '2027-07-05 18:58:32.092418-03', 'Lote de Harina 0000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 71, 14);
INSERT INTO public."DonationItems" VALUES (143, 58, '2027-06-07 18:58:32.092418-03', 'Lote de Azúcar 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 72, 15);
INSERT INTO public."DonationItems" VALUES (144, 65, '2027-07-14 18:58:32.092418-03', 'Lote de Yerba Mate 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 72, 16);
INSERT INTO public."DonationItems" VALUES (145, 71, '2027-06-16 18:58:32.092418-03', 'Lote de Galletitas Agua', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 73, 17);
INSERT INTO public."DonationItems" VALUES (146, 78, '2027-07-23 18:58:32.092418-03', 'Lote de Galletitas Dulces', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 73, 18);
INSERT INTO public."DonationItems" VALUES (147, 84, '2027-06-25 18:58:32.092418-03', 'Lote de Tomate Triturado 520g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 74, 19);
INSERT INTO public."DonationItems" VALUES (148, 91, '2027-08-01 18:58:32.092418-03', 'Lote de Polenta 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 74, 20);
INSERT INTO public."DonationItems" VALUES (149, 97, '2027-07-04 18:58:32.092418-03', 'Lote de Arvejas Lata 350g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 75, 21);
INSERT INTO public."DonationItems" VALUES (150, 104, '2027-08-10 18:58:32.092418-03', 'Lote de Lentejas 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 75, 22);
INSERT INTO public."DonationItems" VALUES (151, 110, '2027-07-13 18:58:32.092418-03', 'Lote de Jabón en polvo 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 76, 23);
INSERT INTO public."DonationItems" VALUES (152, 117, '2027-08-19 18:58:32.092418-03', 'Lote de Lavandina 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 76, 24);
INSERT INTO public."DonationItems" VALUES (153, 123, '2027-07-22 18:58:32.092418-03', 'Lote de Pañales Talle 4', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 77, 25);
INSERT INTO public."DonationItems" VALUES (154, 130, '2027-08-28 18:58:32.092418-03', 'Lote de Detergente 500ml', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 77, 27);
INSERT INTO public."DonationItems" VALUES (155, 136, '2027-07-31 18:58:32.092418-03', 'Lote de Arroz 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 78, 5);
INSERT INTO public."DonationItems" VALUES (156, 143, '2027-09-06 18:58:32.092418-03', 'Lote de Fideos Spaghetti', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 78, 6);
INSERT INTO public."DonationItems" VALUES (157, 149, '2027-08-09 18:58:32.092418-03', 'Lote de Fideos Coditos', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 79, 7);
INSERT INTO public."DonationItems" VALUES (158, 156, '2027-09-15 18:58:32.092418-03', 'Lote de Leche Entera larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 79, 8);
INSERT INTO public."DonationItems" VALUES (159, 162, '2027-08-18 18:58:32.092418-03', 'Lote de Leche Descremada larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 80, 9);
INSERT INTO public."DonationItems" VALUES (160, 169, '2027-09-24 18:58:32.092418-03', 'Lote de Leche Entera en polvo', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 80, 10);
INSERT INTO public."DonationItems" VALUES (161, 175, '2027-08-27 18:58:32.092418-03', 'Lote de Leche Sin lactosa', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 81, 11);
INSERT INTO public."DonationItems" VALUES (162, 182, '2027-10-03 18:58:32.092418-03', 'Lote de Aceite Girasol 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 81, 12);
INSERT INTO public."DonationItems" VALUES (163, 188, '2027-09-05 18:58:32.092418-03', 'Lote de Harina 000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 82, 13);
INSERT INTO public."DonationItems" VALUES (164, 195, '2027-10-12 18:58:32.092418-03', 'Lote de Harina 0000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 82, 14);
INSERT INTO public."DonationItems" VALUES (165, 20, '2027-09-14 18:58:32.092418-03', 'Lote de Azúcar 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 83, 15);
INSERT INTO public."DonationItems" VALUES (166, 27, '2027-10-21 18:58:32.092418-03', 'Lote de Yerba Mate 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 83, 16);
INSERT INTO public."DonationItems" VALUES (167, 33, '2027-09-23 18:58:32.092418-03', 'Lote de Galletitas Agua', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 84, 17);
INSERT INTO public."DonationItems" VALUES (168, 40, '2027-10-30 18:58:32.092418-03', 'Lote de Galletitas Dulces', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 84, 18);
INSERT INTO public."DonationItems" VALUES (169, 46, '2027-10-02 18:58:32.092418-03', 'Lote de Tomate Triturado 520g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 85, 19);
INSERT INTO public."DonationItems" VALUES (170, 53, '2027-11-08 18:58:32.092418-03', 'Lote de Polenta 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 85, 20);
INSERT INTO public."DonationItems" VALUES (171, 59, '2027-10-11 18:58:32.092418-03', 'Lote de Arvejas Lata 350g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 86, 21);
INSERT INTO public."DonationItems" VALUES (172, 66, '2027-11-17 18:58:32.092418-03', 'Lote de Lentejas 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 86, 22);
INSERT INTO public."DonationItems" VALUES (173, 72, '2027-10-20 18:58:32.092418-03', 'Lote de Jabón en polvo 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 87, 23);
INSERT INTO public."DonationItems" VALUES (174, 79, '2027-11-26 18:58:32.092418-03', 'Lote de Lavandina 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 87, 24);
INSERT INTO public."DonationItems" VALUES (175, 85, '2027-10-29 18:58:32.092418-03', 'Lote de Pañales Talle 4', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 88, 25);
INSERT INTO public."DonationItems" VALUES (176, 92, '2027-12-05 18:58:32.092418-03', 'Lote de Detergente 500ml', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 88, 27);
INSERT INTO public."DonationItems" VALUES (177, 98, '2027-11-07 18:58:32.092418-03', 'Lote de Arroz 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 89, 5);
INSERT INTO public."DonationItems" VALUES (178, 105, '2027-12-14 18:58:32.092418-03', 'Lote de Fideos Spaghetti', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 89, 6);
INSERT INTO public."DonationItems" VALUES (179, 111, '2027-11-16 18:58:32.092418-03', 'Lote de Fideos Coditos', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 90, 7);
INSERT INTO public."DonationItems" VALUES (180, 118, '2027-12-23 18:58:32.092418-03', 'Lote de Leche Entera larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 90, 8);
INSERT INTO public."DonationItems" VALUES (181, 124, '2027-11-25 18:58:32.092418-03', 'Lote de Leche Descremada larga vida', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 91, 9);
INSERT INTO public."DonationItems" VALUES (182, 131, '2028-01-01 18:58:32.092418-03', 'Lote de Leche Entera en polvo', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 91, 10);
INSERT INTO public."DonationItems" VALUES (183, 137, '2027-12-04 18:58:32.092418-03', 'Lote de Leche Sin lactosa', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 92, 11);
INSERT INTO public."DonationItems" VALUES (184, 144, '2028-01-10 18:58:32.092418-03', 'Lote de Aceite Girasol 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 92, 12);
INSERT INTO public."DonationItems" VALUES (185, 150, '2027-12-13 18:58:32.092418-03', 'Lote de Harina 000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 93, 13);
INSERT INTO public."DonationItems" VALUES (186, 157, '2028-01-19 18:58:32.092418-03', 'Lote de Harina 0000', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 93, 14);
INSERT INTO public."DonationItems" VALUES (187, 163, '2027-12-22 18:58:32.092418-03', 'Lote de Azúcar 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 94, 15);
INSERT INTO public."DonationItems" VALUES (188, 170, '2028-01-28 18:58:32.092418-03', 'Lote de Yerba Mate 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 94, 16);
INSERT INTO public."DonationItems" VALUES (189, 176, '2027-12-31 18:58:32.092418-03', 'Lote de Galletitas Agua', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 95, 17);
INSERT INTO public."DonationItems" VALUES (190, 183, '2028-02-06 18:58:32.092418-03', 'Lote de Galletitas Dulces', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 95, 18);
INSERT INTO public."DonationItems" VALUES (191, 189, '2028-01-09 18:58:32.092418-03', 'Lote de Tomate Triturado 520g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 96, 19);
INSERT INTO public."DonationItems" VALUES (192, 196, '2028-02-15 18:58:32.092418-03', 'Lote de Polenta 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 96, 20);
INSERT INTO public."DonationItems" VALUES (193, 21, '2028-01-18 18:58:32.092418-03', 'Lote de Arvejas Lata 350g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 97, 21);
INSERT INTO public."DonationItems" VALUES (194, 28, '2028-02-24 18:58:32.092418-03', 'Lote de Lentejas 500g', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 97, 22);
INSERT INTO public."DonationItems" VALUES (195, 34, '2028-01-27 18:58:32.092418-03', 'Lote de Jabón en polvo 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 98, 23);
INSERT INTO public."DonationItems" VALUES (196, 41, '2028-03-04 18:58:32.092418-03', 'Lote de Lavandina 1lt', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 98, 24);
INSERT INTO public."DonationItems" VALUES (197, 47, '2028-02-05 18:58:32.092418-03', 'Lote de Pañales Talle 4', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 99, 25);
INSERT INTO public."DonationItems" VALUES (198, 54, '2028-03-13 18:58:32.092418-03', 'Lote de Detergente 500ml', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 99, 27);
INSERT INTO public."DonationItems" VALUES (199, 60, '2028-02-14 18:58:32.092418-03', 'Lote de Arroz 1kg', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 100, 5);
INSERT INTO public."DonationItems" VALUES (200, 67, '2028-03-22 18:58:32.092418-03', 'Lote de Fideos Spaghetti', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 100, 6);


--
-- Data for Name: Donations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Donations" VALUES (1, 'Entrega mensual de alimentos secos - remito 0001', '2026-11-01 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 52, 27, 1);
INSERT INTO public."Donations" VALUES (2, 'Recepción de productos de almacén - remito 0002', '2026-10-27 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 53, 28, 2);
INSERT INTO public."Donations" VALUES (3, 'Aporte para comedores comunitarios - remito 0003', '2026-10-26 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 54, 29, 3);
INSERT INTO public."Donations" VALUES (4, 'Donación de productos de primera necesidad - remito 0004', '2026-11-04 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 55, 30, 4);
INSERT INTO public."Donations" VALUES (5, 'Lote de alimentos no perecederos - remito 0005', '2026-10-24 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 56, 31, 5);
INSERT INTO public."Donations" VALUES (6, 'Campaña de invierno - alimentos básicos - remito 0006', '2026-10-23 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 57, 32, 6);
INSERT INTO public."Donations" VALUES (7, 'Reposición de mercadería para distribución - remito 0007', '2026-11-07 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 58, 33, 7);
INSERT INTO public."Donations" VALUES (8, 'Aporte institucional para merenderos - remito 0008', '2026-10-21 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 59, 34, 8);
INSERT INTO public."Donations" VALUES (9, 'Entrega mensual de alimentos secos - remito 0009', '2026-10-20 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 60, 35, 9);
INSERT INTO public."Donations" VALUES (10, 'Recepción de productos de almacén - remito 0010', '2026-11-10 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 61, 36, 10);
INSERT INTO public."Donations" VALUES (11, 'Aporte para comedores comunitarios - remito 0011', '2026-10-18 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 62, 37, 11);
INSERT INTO public."Donations" VALUES (12, 'Donación de productos de primera necesidad - remito 0012', '2026-10-17 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 63, 38, 12);
INSERT INTO public."Donations" VALUES (13, 'Lote de alimentos no perecederos - remito 0013', '2026-11-13 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 64, 39, 13);
INSERT INTO public."Donations" VALUES (14, 'Campaña de invierno - alimentos básicos - remito 0014', '2026-10-15 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 65, 40, 14);
INSERT INTO public."Donations" VALUES (15, 'Reposición de mercadería para distribución - remito 0015', '2026-10-14 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 66, 41, 15);
INSERT INTO public."Donations" VALUES (16, 'Aporte institucional para merenderos - remito 0016', '2026-11-02 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 67, 42, 16);
INSERT INTO public."Donations" VALUES (17, 'Entrega mensual de alimentos secos - remito 0017', '2026-10-12 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 68, 43, 17);
INSERT INTO public."Donations" VALUES (18, 'Recepción de productos de almacén - remito 0018', '2026-10-11 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 69, 44, 18);
INSERT INTO public."Donations" VALUES (19, 'Aporte para comedores comunitarios - remito 0019', '2026-11-05 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 70, 45, 19);
INSERT INTO public."Donations" VALUES (20, 'Donación de productos de primera necesidad - remito 0020', '2026-10-09 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 71, 46, 20);
INSERT INTO public."Donations" VALUES (21, 'Lote de alimentos no perecederos - remito 0021', '2026-10-08 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 72, 47, 21);
INSERT INTO public."Donations" VALUES (22, 'Campaña de invierno - alimentos básicos - remito 0022', '2026-11-08 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 73, 48, 22);
INSERT INTO public."Donations" VALUES (23, 'Reposición de mercadería para distribución - remito 0023', '2026-10-06 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 74, 49, 23);
INSERT INTO public."Donations" VALUES (24, 'Aporte institucional para merenderos - remito 0024', '2026-10-05 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 75, 50, 24);
INSERT INTO public."Donations" VALUES (25, 'Entrega mensual de alimentos secos - remito 0025', '2026-11-11 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 76, 51, 25);
INSERT INTO public."Donations" VALUES (26, 'Recepción de productos de almacén - remito 0026', '2026-10-03 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 52, 27, 1);
INSERT INTO public."Donations" VALUES (27, 'Aporte para comedores comunitarios - remito 0027', '2026-10-02 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 53, 28, 2);
INSERT INTO public."Donations" VALUES (28, 'Donación de productos de primera necesidad - remito 0028', '2026-10-31 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 54, 29, 3);
INSERT INTO public."Donations" VALUES (29, 'Lote de alimentos no perecederos - remito 0029', '2026-09-30 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 55, 30, 4);
INSERT INTO public."Donations" VALUES (30, 'Campaña de invierno - alimentos básicos - remito 0030', '2026-09-29 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 56, 31, 5);
INSERT INTO public."Donations" VALUES (31, 'Reposición de mercadería para distribución - remito 0031', '2026-11-03 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 57, 32, 6);
INSERT INTO public."Donations" VALUES (32, 'Aporte institucional para merenderos - remito 0032', '2026-09-27 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 58, 33, 7);
INSERT INTO public."Donations" VALUES (33, 'Entrega mensual de alimentos secos - remito 0033', '2026-09-26 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 59, 34, 8);
INSERT INTO public."Donations" VALUES (34, 'Recepción de productos de almacén - remito 0034', '2026-11-06 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 60, 35, 9);
INSERT INTO public."Donations" VALUES (35, 'Aporte para comedores comunitarios - remito 0035', '2026-09-24 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 61, 36, 10);
INSERT INTO public."Donations" VALUES (36, 'Donación de productos de primera necesidad - remito 0036', '2026-09-23 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 62, 37, 11);
INSERT INTO public."Donations" VALUES (37, 'Lote de alimentos no perecederos - remito 0037', '2026-11-09 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 63, 38, 12);
INSERT INTO public."Donations" VALUES (38, 'Campaña de invierno - alimentos básicos - remito 0038', '2026-09-21 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 64, 39, 13);
INSERT INTO public."Donations" VALUES (39, 'Reposición de mercadería para distribución - remito 0039', '2026-09-20 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 65, 40, 14);
INSERT INTO public."Donations" VALUES (40, 'Aporte institucional para merenderos - remito 0040', '2026-11-12 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 66, 41, 15);
INSERT INTO public."Donations" VALUES (41, 'Entrega mensual de alimentos secos - remito 0041', '2026-09-18 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 67, 42, 16);
INSERT INTO public."Donations" VALUES (42, 'Recepción de productos de almacén - remito 0042', '2026-09-17 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 68, 43, 17);
INSERT INTO public."Donations" VALUES (43, 'Aporte para comedores comunitarios - remito 0043', '2026-11-01 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 69, 44, 18);
INSERT INTO public."Donations" VALUES (44, 'Donación de productos de primera necesidad - remito 0044', '2026-09-15 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 70, 45, 19);
INSERT INTO public."Donations" VALUES (45, 'Lote de alimentos no perecederos - remito 0045', '2026-10-29 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 71, 46, 20);
INSERT INTO public."Donations" VALUES (46, 'Campaña de invierno - alimentos básicos - remito 0046', '2026-11-04 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 72, 47, 21);
INSERT INTO public."Donations" VALUES (47, 'Reposición de mercadería para distribución - remito 0047', '2026-10-27 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 73, 48, 22);
INSERT INTO public."Donations" VALUES (48, 'Aporte institucional para merenderos - remito 0048', '2026-10-26 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 74, 49, 23);
INSERT INTO public."Donations" VALUES (49, 'Entrega mensual de alimentos secos - remito 0049', '2026-11-07 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 75, 50, 24);
INSERT INTO public."Donations" VALUES (50, 'Recepción de productos de almacén - remito 0050', '2026-10-24 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 76, 51, 25);
INSERT INTO public."Donations" VALUES (51, 'Aporte para comedores comunitarios - remito 0051', '2026-10-23 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 52, 27, 1);
INSERT INTO public."Donations" VALUES (52, 'Donación de productos de primera necesidad - remito 0052', '2026-11-10 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 53, 28, 2);
INSERT INTO public."Donations" VALUES (53, 'Lote de alimentos no perecederos - remito 0053', '2026-10-21 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 54, 29, 3);
INSERT INTO public."Donations" VALUES (54, 'Campaña de invierno - alimentos básicos - remito 0054', '2026-10-20 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 55, 30, 4);
INSERT INTO public."Donations" VALUES (55, 'Reposición de mercadería para distribución - remito 0055', '2026-11-13 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 56, 31, 5);
INSERT INTO public."Donations" VALUES (56, 'Aporte institucional para merenderos - remito 0056', '2026-10-18 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 57, 32, 6);
INSERT INTO public."Donations" VALUES (57, 'Entrega mensual de alimentos secos - remito 0057', '2026-10-17 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 58, 33, 7);
INSERT INTO public."Donations" VALUES (58, 'Recepción de productos de almacén - remito 0058', '2026-11-02 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 59, 34, 8);
INSERT INTO public."Donations" VALUES (59, 'Aporte para comedores comunitarios - remito 0059', '2026-10-15 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 60, 35, 9);
INSERT INTO public."Donations" VALUES (60, 'Donación de productos de primera necesidad - remito 0060', '2026-10-14 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 61, 36, 10);
INSERT INTO public."Donations" VALUES (61, 'Lote de alimentos no perecederos - remito 0061', '2026-11-05 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 62, 37, 11);
INSERT INTO public."Donations" VALUES (62, 'Campaña de invierno - alimentos básicos - remito 0062', '2026-10-12 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 63, 38, 12);
INSERT INTO public."Donations" VALUES (63, 'Reposición de mercadería para distribución - remito 0063', '2026-10-11 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 64, 39, 13);
INSERT INTO public."Donations" VALUES (64, 'Aporte institucional para merenderos - remito 0064', '2026-11-08 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 65, 40, 14);
INSERT INTO public."Donations" VALUES (65, 'Entrega mensual de alimentos secos - remito 0065', '2026-10-09 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 66, 41, 15);
INSERT INTO public."Donations" VALUES (66, 'Recepción de productos de almacén - remito 0066', '2026-10-08 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 67, 42, 16);
INSERT INTO public."Donations" VALUES (67, 'Aporte para comedores comunitarios - remito 0067', '2026-11-11 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 68, 43, 17);
INSERT INTO public."Donations" VALUES (68, 'Donación de productos de primera necesidad - remito 0068', '2026-10-06 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 69, 44, 18);
INSERT INTO public."Donations" VALUES (69, 'Lote de alimentos no perecederos - remito 0069', '2026-10-05 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 70, 45, 19);
INSERT INTO public."Donations" VALUES (70, 'Campaña de invierno - alimentos básicos - remito 0070', '2026-10-31 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 71, 46, 20);
INSERT INTO public."Donations" VALUES (71, 'Reposición de mercadería para distribución - remito 0071', '2026-10-03 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 72, 47, 21);
INSERT INTO public."Donations" VALUES (72, 'Aporte institucional para merenderos - remito 0072', '2026-10-02 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 73, 48, 22);
INSERT INTO public."Donations" VALUES (73, 'Entrega mensual de alimentos secos - remito 0073', '2026-11-03 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 74, 49, 23);
INSERT INTO public."Donations" VALUES (74, 'Recepción de productos de almacén - remito 0074', '2026-09-30 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 75, 50, 24);
INSERT INTO public."Donations" VALUES (75, 'Aporte para comedores comunitarios - remito 0075', '2026-09-29 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 76, 51, 25);
INSERT INTO public."Donations" VALUES (76, 'Donación de productos de primera necesidad - remito 0076', '2026-11-06 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 52, 27, 1);
INSERT INTO public."Donations" VALUES (77, 'Lote de alimentos no perecederos - remito 0077', '2026-09-27 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 53, 28, 2);
INSERT INTO public."Donations" VALUES (78, 'Campaña de invierno - alimentos básicos - remito 0078', '2026-09-26 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 54, 29, 3);
INSERT INTO public."Donations" VALUES (79, 'Reposición de mercadería para distribución - remito 0079', '2026-11-09 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 55, 30, 4);
INSERT INTO public."Donations" VALUES (80, 'Aporte institucional para merenderos - remito 0080', '2026-09-24 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 56, 31, 5);
INSERT INTO public."Donations" VALUES (81, 'Entrega mensual de alimentos secos - remito 0081', '2026-09-23 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 57, 32, 6);
INSERT INTO public."Donations" VALUES (82, 'Recepción de productos de almacén - remito 0082', '2026-11-12 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 58, 33, 7);
INSERT INTO public."Donations" VALUES (83, 'Aporte para comedores comunitarios - remito 0083', '2026-09-21 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 59, 34, 8);
INSERT INTO public."Donations" VALUES (84, 'Donación de productos de primera necesidad - remito 0084', '2026-09-20 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 60, 35, 9);
INSERT INTO public."Donations" VALUES (85, 'Lote de alimentos no perecederos - remito 0085', '2026-11-01 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 61, 36, 10);
INSERT INTO public."Donations" VALUES (86, 'Campaña de invierno - alimentos básicos - remito 0086', '2026-09-18 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 62, 37, 11);
INSERT INTO public."Donations" VALUES (87, 'Reposición de mercadería para distribución - remito 0087', '2026-09-17 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 63, 38, 12);
INSERT INTO public."Donations" VALUES (88, 'Aporte institucional para merenderos - remito 0088', '2026-11-04 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 64, 39, 13);
INSERT INTO public."Donations" VALUES (89, 'Entrega mensual de alimentos secos - remito 0089', '2026-09-15 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 65, 40, 14);
INSERT INTO public."Donations" VALUES (90, 'Recepción de productos de almacén - remito 0090', '2026-10-29 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 66, 41, 15);
INSERT INTO public."Donations" VALUES (91, 'Aporte para comedores comunitarios - remito 0091', '2026-11-07 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 67, 42, 16);
INSERT INTO public."Donations" VALUES (92, 'Donación de productos de primera necesidad - remito 0092', '2026-10-27 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 68, 43, 17);
INSERT INTO public."Donations" VALUES (93, 'Lote de alimentos no perecederos - remito 0093', '2026-10-26 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 69, 44, 18);
INSERT INTO public."Donations" VALUES (94, 'Campaña de invierno - alimentos básicos - remito 0094', '2026-11-10 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 70, 45, 19);
INSERT INTO public."Donations" VALUES (95, 'Reposición de mercadería para distribución - remito 0095', '2026-10-24 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 71, 46, 20);
INSERT INTO public."Donations" VALUES (96, 'Aporte institucional para merenderos - remito 0096', '2026-10-23 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 72, 47, 21);
INSERT INTO public."Donations" VALUES (97, 'Entrega mensual de alimentos secos - remito 0097', '2026-11-13 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 73, 48, 22);
INSERT INTO public."Donations" VALUES (98, 'Recepción de productos de almacén - remito 0098', '2026-10-21 18:58:32.092418-03', 'Not Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 74, 49, 23);
INSERT INTO public."Donations" VALUES (99, 'Aporte para comedores comunitarios - remito 0099', '2026-10-20 18:58:32.092418-03', 'Delivered', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 75, 50, 24);
INSERT INTO public."Donations" VALUES (100, 'Donación de productos de primera necesidad - remito 0100', '2026-11-02 18:58:32.092418-03', 'Scheduled', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 76, 51, 25);


--
-- Data for Name: Entities; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Entities" VALUES (4, 'ARTICLES', 'Gestión de artículos y variantes');
INSERT INTO public."Entities" VALUES (1, 'USERS', 'Gestión de usuarios');
INSERT INTO public."Entities" VALUES (2, 'INSTITUTIONS', 'Gestión de instituciones');
INSERT INTO public."Entities" VALUES (3, 'ROLES', 'Gestión de roles del sistema');
INSERT INTO public."Entities" VALUES (5, 'DONATIONS', 'Registro y gestión de donaciones');
INSERT INTO public."Entities" VALUES (6, 'DONATIONITEMS', 'Artículos dentro de donaciones');
INSERT INTO public."Entities" VALUES (7, 'INSTITUTIONNEEDS', 'Necesidades de instituciones');
INSERT INTO public."Entities" VALUES (8, 'INVENTORIES', 'Inventario general del sistema');
INSERT INTO public."Entities" VALUES (9, 'TYPES', 'Tipos de instituciones');


--
-- Data for Name: Institutions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Institutions" VALUES (1, 'Comedor Comunitario Los Aromos', 'Barracas, Ciudad Autónoma de Buenos Aires', 'Recipient', 'Active', 7);
INSERT INTO public."Institutions" VALUES (2, 'Merendero Rayito de Sol', 'Avellaneda, Buenos Aires', 'Recipient', 'Active', 8);
INSERT INTO public."Institutions" VALUES (3, 'Centro Comunitario La Esperanza', 'Lanús, Buenos Aires', 'Recipient', 'Active', 4);
INSERT INTO public."Institutions" VALUES (4, 'Comedor Puertas Abiertas', 'Quilmes, Buenos Aires', 'Recipient', 'Active', 9);
INSERT INTO public."Institutions" VALUES (5, 'Merendero Pequeños Pasos', 'Berazategui, Buenos Aires', 'Recipient', 'Active', 10);
INSERT INTO public."Institutions" VALUES (6, 'Asociación Civil Manos del Sur', 'Florencio Varela, Buenos Aires', 'Recipient', 'Active', 7);
INSERT INTO public."Institutions" VALUES (7, 'Comedor Nuestra Señora del Camino', 'Lomas de Zamora, Buenos Aires', 'Recipient', 'Active', 8);
INSERT INTO public."Institutions" VALUES (8, 'Centro Barrial El Encuentro', 'Almirante Brown, Buenos Aires', 'Recipient', 'Active', 4);
INSERT INTO public."Institutions" VALUES (9, 'Comedor San Cayetano', 'La Plata, Buenos Aires', 'Recipient', 'Active', 9);
INSERT INTO public."Institutions" VALUES (10, 'Merendero Estrellita', 'Berisso, Buenos Aires', 'Recipient', 'Pending', 10);
INSERT INTO public."Institutions" VALUES (11, 'Fundación Puente Verde', 'Ensenada, Buenos Aires', 'Recipient', 'Active', 7);
INSERT INTO public."Institutions" VALUES (12, 'Comedor La Nueva Familia', 'San Justo, Buenos Aires', 'Recipient', 'Active', 8);
INSERT INTO public."Institutions" VALUES (13, 'Centro Comunitario 9 de Julio', 'Ramos Mejía, Buenos Aires', 'Recipient', 'Active', 4);
INSERT INTO public."Institutions" VALUES (14, 'Merendero Rincón Feliz', 'Morón, Buenos Aires', 'Recipient', 'Active', 9);
INSERT INTO public."Institutions" VALUES (15, 'Comedor Unidos por el Barrio', 'Merlo, Buenos Aires', 'Recipient', 'Active', 10);
INSERT INTO public."Institutions" VALUES (16, 'Asociación Vecinal El Ombú', 'Moreno, Buenos Aires', 'Recipient', 'Active', 7);
INSERT INTO public."Institutions" VALUES (17, 'Comedor María Auxiliadora', 'San Miguel, Buenos Aires', 'Recipient', 'Active', 8);
INSERT INTO public."Institutions" VALUES (18, 'Centro de Día Horizonte', 'José C. Paz, Buenos Aires', 'Recipient', 'Active', 4);
INSERT INTO public."Institutions" VALUES (19, 'Merendero Semillitas', 'Tigre, Buenos Aires', 'Recipient', 'Active', 9);
INSERT INTO public."Institutions" VALUES (20, 'Comedor Las Tunas', 'San Fernando, Buenos Aires', 'Recipient', 'Pending', 10);
INSERT INTO public."Institutions" VALUES (21, 'Fundación Un Plato Más', 'Escobar, Buenos Aires', 'Recipient', 'Active', 7);
INSERT INTO public."Institutions" VALUES (22, 'Comedor Comunitario El Progreso', 'San Martín, Buenos Aires', 'Recipient', 'Active', 8);
INSERT INTO public."Institutions" VALUES (23, 'Centro Solidario Barracas', 'Tres de Febrero, Buenos Aires', 'Recipient', 'Active', 4);
INSERT INTO public."Institutions" VALUES (24, 'Merendero Abrigo y Pan', 'Hurlingham, Buenos Aires', 'Recipient', 'Active', 9);
INSERT INTO public."Institutions" VALUES (25, 'Asociación Comunitaria La Ribera', 'CABA - Parque Patricios', 'Recipient', 'Active', 10);
INSERT INTO public."Institutions" VALUES (26, 'Distribuidora del Plata', 'Barracas, Ciudad Autónoma de Buenos Aires', 'Donor', 'Active', 6);
INSERT INTO public."Institutions" VALUES (27, 'Alimentos del Parque', 'Avellaneda, Buenos Aires', 'Donor', 'Active', 2);
INSERT INTO public."Institutions" VALUES (28, 'Cooperativa La Unión', 'Lanús, Buenos Aires', 'Donor', 'Active', 3);
INSERT INTO public."Institutions" VALUES (29, 'Mercado Central del Sur', 'Quilmes, Buenos Aires', 'Donor', 'Active', 4);
INSERT INTO public."Institutions" VALUES (30, 'Panificadora San Martín', 'Berazategui, Buenos Aires', 'Donor', 'Active', 5);
INSERT INTO public."Institutions" VALUES (31, 'Lácteos La Estancia', 'Florencio Varela, Buenos Aires', 'Donor', 'Active', 6);
INSERT INTO public."Institutions" VALUES (32, 'Molino La Pampa', 'Lomas de Zamora, Buenos Aires', 'Donor', 'Active', 2);
INSERT INTO public."Institutions" VALUES (33, 'Supermercado Punto Norte', 'Almirante Brown, Buenos Aires', 'Donor', 'Active', 3);
INSERT INTO public."Institutions" VALUES (34, 'Comercial Buenos Aires', 'La Plata, Buenos Aires', 'Donor', 'Active', 4);
INSERT INTO public."Institutions" VALUES (35, 'Distribuidora Rivadavia', 'Berisso, Buenos Aires', 'Donor', 'Active', 5);
INSERT INTO public."Institutions" VALUES (36, 'Frigorífico Los Álamos', 'Ensenada, Buenos Aires', 'Donor', 'Active', 6);
INSERT INTO public."Institutions" VALUES (37, 'Almacenes del Oeste', 'San Justo, Buenos Aires', 'Donor', 'Active', 2);
INSERT INTO public."Institutions" VALUES (38, 'Cooperativa Horizonte', 'Ramos Mejía, Buenos Aires', 'Donor', 'Active', 3);
INSERT INTO public."Institutions" VALUES (39, 'Productores de la Ribera', 'Morón, Buenos Aires', 'Donor', 'Active', 4);
INSERT INTO public."Institutions" VALUES (40, 'Mayorista San Jorge', 'Merlo, Buenos Aires', 'Donor', 'Active', 5);
INSERT INTO public."Institutions" VALUES (41, 'Supermercado El Puente', 'Moreno, Buenos Aires', 'Donor', 'Active', 6);
INSERT INTO public."Institutions" VALUES (42, 'Alimentos El Trigal', 'San Miguel, Buenos Aires', 'Donor', 'Active', 2);
INSERT INTO public."Institutions" VALUES (43, 'Panificados del Sur', 'José C. Paz, Buenos Aires', 'Donor', 'Active', 3);
INSERT INTO public."Institutions" VALUES (44, 'Lácteos Don Ernesto', 'Tigre, Buenos Aires', 'Donor', 'Active', 4);
INSERT INTO public."Institutions" VALUES (45, 'Distribuidora La Plata', 'San Fernando, Buenos Aires', 'Donor', 'Active', 5);
INSERT INTO public."Institutions" VALUES (46, 'Cooperativa 25 de Mayo', 'Escobar, Buenos Aires', 'Donor', 'Active', 6);
INSERT INTO public."Institutions" VALUES (47, 'Mercado San Justo', 'San Martín, Buenos Aires', 'Donor', 'Active', 2);
INSERT INTO public."Institutions" VALUES (48, 'Mayorista La Estrella', 'Tres de Febrero, Buenos Aires', 'Donor', 'Active', 3);
INSERT INTO public."Institutions" VALUES (49, 'Alimentos Nuestra Tierra', 'Hurlingham, Buenos Aires', 'Donor', 'Active', 4);
INSERT INTO public."Institutions" VALUES (50, 'Comercial del Camino', 'CABA - Parque Patricios', 'Donor', 'Active', 5);


--
-- Data for Name: InstitutionsNeeds; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."InstitutionsNeeds" VALUES (1, 15, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 1, 13);
INSERT INTO public."InstitutionsNeeds" VALUES (2, 22, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, 14);
INSERT INTO public."InstitutionsNeeds" VALUES (3, 29, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 3, 15);
INSERT INTO public."InstitutionsNeeds" VALUES (4, 36, 'Resolved', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 16);
INSERT INTO public."InstitutionsNeeds" VALUES (5, 43, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 5, 17);
INSERT INTO public."InstitutionsNeeds" VALUES (6, 50, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 6, 18);
INSERT INTO public."InstitutionsNeeds" VALUES (7, 14, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 7, 19);
INSERT INTO public."InstitutionsNeeds" VALUES (8, 21, 'Resolved', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 8, 20);
INSERT INTO public."InstitutionsNeeds" VALUES (9, 28, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 9, 21);
INSERT INTO public."InstitutionsNeeds" VALUES (10, 35, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 10, 22);
INSERT INTO public."InstitutionsNeeds" VALUES (11, 42, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 11, 23);
INSERT INTO public."InstitutionsNeeds" VALUES (12, 49, 'Resolved', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 12, 24);
INSERT INTO public."InstitutionsNeeds" VALUES (13, 13, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 13, 25);
INSERT INTO public."InstitutionsNeeds" VALUES (14, 20, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 14, 27);
INSERT INTO public."InstitutionsNeeds" VALUES (15, 27, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 15, 5);
INSERT INTO public."InstitutionsNeeds" VALUES (16, 34, 'Resolved', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 16, 6);
INSERT INTO public."InstitutionsNeeds" VALUES (17, 41, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 17, 7);
INSERT INTO public."InstitutionsNeeds" VALUES (18, 48, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 18, 8);
INSERT INTO public."InstitutionsNeeds" VALUES (19, 12, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 19, 9);
INSERT INTO public."InstitutionsNeeds" VALUES (20, 19, 'Resolved', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 20, 10);
INSERT INTO public."InstitutionsNeeds" VALUES (21, 26, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 21, 11);
INSERT INTO public."InstitutionsNeeds" VALUES (22, 33, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 22, 12);
INSERT INTO public."InstitutionsNeeds" VALUES (23, 40, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 23, 13);
INSERT INTO public."InstitutionsNeeds" VALUES (24, 47, 'Resolved', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 24, 14);
INSERT INTO public."InstitutionsNeeds" VALUES (25, 11, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 25, 15);
INSERT INTO public."InstitutionsNeeds" VALUES (26, 18, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 1, 16);
INSERT INTO public."InstitutionsNeeds" VALUES (27, 25, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, 17);
INSERT INTO public."InstitutionsNeeds" VALUES (28, 32, 'Resolved', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 3, 18);
INSERT INTO public."InstitutionsNeeds" VALUES (29, 39, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 19);
INSERT INTO public."InstitutionsNeeds" VALUES (30, 46, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 5, 20);
INSERT INTO public."InstitutionsNeeds" VALUES (31, 10, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 6, 21);
INSERT INTO public."InstitutionsNeeds" VALUES (32, 17, 'Resolved', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 7, 22);
INSERT INTO public."InstitutionsNeeds" VALUES (33, 24, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 8, 23);
INSERT INTO public."InstitutionsNeeds" VALUES (34, 31, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 9, 24);
INSERT INTO public."InstitutionsNeeds" VALUES (35, 38, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 10, 25);
INSERT INTO public."InstitutionsNeeds" VALUES (36, 45, 'Resolved', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 11, 27);
INSERT INTO public."InstitutionsNeeds" VALUES (37, 9, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 12, 5);
INSERT INTO public."InstitutionsNeeds" VALUES (38, 16, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 13, 6);
INSERT INTO public."InstitutionsNeeds" VALUES (39, 23, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 14, 7);
INSERT INTO public."InstitutionsNeeds" VALUES (40, 30, 'Resolved', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 15, 8);
INSERT INTO public."InstitutionsNeeds" VALUES (41, 37, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 16, 9);
INSERT INTO public."InstitutionsNeeds" VALUES (42, 44, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 17, 10);
INSERT INTO public."InstitutionsNeeds" VALUES (43, 8, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 18, 11);
INSERT INTO public."InstitutionsNeeds" VALUES (44, 15, 'Resolved', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 19, 12);
INSERT INTO public."InstitutionsNeeds" VALUES (45, 22, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 20, 13);
INSERT INTO public."InstitutionsNeeds" VALUES (46, 29, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 21, 14);
INSERT INTO public."InstitutionsNeeds" VALUES (47, 36, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 22, 15);
INSERT INTO public."InstitutionsNeeds" VALUES (48, 43, 'Resolved', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 23, 16);
INSERT INTO public."InstitutionsNeeds" VALUES (49, 50, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 24, 17);
INSERT INTO public."InstitutionsNeeds" VALUES (50, 14, 'Pending', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 25, 18);


--
-- Data for Name: Inventories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Inventories" VALUES (1, 40, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 1);
INSERT INTO public."Inventories" VALUES (2, 47, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2);
INSERT INTO public."Inventories" VALUES (3, 53, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 3);
INSERT INTO public."Inventories" VALUES (4, 60, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4);
INSERT INTO public."Inventories" VALUES (5, 0, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 5);
INSERT INTO public."Inventories" VALUES (6, 0, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 6);
INSERT INTO public."Inventories" VALUES (7, 79, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 7);
INSERT INTO public."Inventories" VALUES (8, 86, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 8);
INSERT INTO public."Inventories" VALUES (9, 92, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 9);
INSERT INTO public."Inventories" VALUES (10, 99, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 10);
INSERT INTO public."Inventories" VALUES (11, 0, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 11);
INSERT INTO public."Inventories" VALUES (12, 0, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 12);
INSERT INTO public."Inventories" VALUES (13, 118, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 13);
INSERT INTO public."Inventories" VALUES (14, 125, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 14);
INSERT INTO public."Inventories" VALUES (15, 131, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 15);
INSERT INTO public."Inventories" VALUES (16, 138, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 16);
INSERT INTO public."Inventories" VALUES (17, 0, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 17);
INSERT INTO public."Inventories" VALUES (18, 0, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 18);
INSERT INTO public."Inventories" VALUES (19, 157, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 19);
INSERT INTO public."Inventories" VALUES (20, 164, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 20);
INSERT INTO public."Inventories" VALUES (21, 170, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 21);
INSERT INTO public."Inventories" VALUES (22, 177, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 22);
INSERT INTO public."Inventories" VALUES (23, 0, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 23);
INSERT INTO public."Inventories" VALUES (24, 0, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 24);
INSERT INTO public."Inventories" VALUES (25, 196, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 25);
INSERT INTO public."Inventories" VALUES (26, 22, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 26);
INSERT INTO public."Inventories" VALUES (27, 28, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 27);
INSERT INTO public."Inventories" VALUES (28, 35, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 28);
INSERT INTO public."Inventories" VALUES (29, 0, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 29);
INSERT INTO public."Inventories" VALUES (30, 0, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 30);
INSERT INTO public."Inventories" VALUES (31, 54, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 31);
INSERT INTO public."Inventories" VALUES (32, 61, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 32);
INSERT INTO public."Inventories" VALUES (33, 67, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 33);
INSERT INTO public."Inventories" VALUES (34, 74, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 34);
INSERT INTO public."Inventories" VALUES (35, 0, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 35);
INSERT INTO public."Inventories" VALUES (36, 0, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 36);
INSERT INTO public."Inventories" VALUES (37, 93, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 37);
INSERT INTO public."Inventories" VALUES (38, 100, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 38);
INSERT INTO public."Inventories" VALUES (39, 106, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 39);
INSERT INTO public."Inventories" VALUES (40, 113, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 40);
INSERT INTO public."Inventories" VALUES (41, 0, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 41);
INSERT INTO public."Inventories" VALUES (42, 0, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 42);
INSERT INTO public."Inventories" VALUES (43, 132, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 43);
INSERT INTO public."Inventories" VALUES (44, 139, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 44);
INSERT INTO public."Inventories" VALUES (45, 145, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 45);
INSERT INTO public."Inventories" VALUES (46, 152, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 46);
INSERT INTO public."Inventories" VALUES (47, 0, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 47);
INSERT INTO public."Inventories" VALUES (48, 0, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 48);
INSERT INTO public."Inventories" VALUES (49, 171, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 49);
INSERT INTO public."Inventories" VALUES (50, 178, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 50);
INSERT INTO public."Inventories" VALUES (51, 184, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 51);
INSERT INTO public."Inventories" VALUES (52, 191, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 52);
INSERT INTO public."Inventories" VALUES (53, 0, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 53);
INSERT INTO public."Inventories" VALUES (54, 0, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 54);
INSERT INTO public."Inventories" VALUES (55, 29, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 55);
INSERT INTO public."Inventories" VALUES (56, 36, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 56);
INSERT INTO public."Inventories" VALUES (57, 42, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 57);
INSERT INTO public."Inventories" VALUES (58, 49, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 58);
INSERT INTO public."Inventories" VALUES (59, 0, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 59);
INSERT INTO public."Inventories" VALUES (60, 0, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 60);
INSERT INTO public."Inventories" VALUES (61, 68, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 61);
INSERT INTO public."Inventories" VALUES (62, 75, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 62);
INSERT INTO public."Inventories" VALUES (63, 81, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 63);
INSERT INTO public."Inventories" VALUES (64, 88, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 64);
INSERT INTO public."Inventories" VALUES (65, 0, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 65);
INSERT INTO public."Inventories" VALUES (66, 0, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 66);
INSERT INTO public."Inventories" VALUES (67, 107, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 67);
INSERT INTO public."Inventories" VALUES (68, 114, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 68);
INSERT INTO public."Inventories" VALUES (69, 120, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 69);
INSERT INTO public."Inventories" VALUES (70, 127, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 70);
INSERT INTO public."Inventories" VALUES (71, 0, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 71);
INSERT INTO public."Inventories" VALUES (72, 0, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 72);
INSERT INTO public."Inventories" VALUES (73, 146, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 73);
INSERT INTO public."Inventories" VALUES (74, 153, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 74);
INSERT INTO public."Inventories" VALUES (75, 159, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 75);
INSERT INTO public."Inventories" VALUES (76, 166, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 76);
INSERT INTO public."Inventories" VALUES (77, 0, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 77);
INSERT INTO public."Inventories" VALUES (78, 0, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 78);
INSERT INTO public."Inventories" VALUES (79, 185, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 79);
INSERT INTO public."Inventories" VALUES (80, 192, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 80);
INSERT INTO public."Inventories" VALUES (81, 198, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 81);
INSERT INTO public."Inventories" VALUES (82, 24, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 82);
INSERT INTO public."Inventories" VALUES (83, 0, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 83);
INSERT INTO public."Inventories" VALUES (84, 0, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 84);
INSERT INTO public."Inventories" VALUES (85, 43, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 85);
INSERT INTO public."Inventories" VALUES (86, 50, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 86);
INSERT INTO public."Inventories" VALUES (87, 56, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 87);
INSERT INTO public."Inventories" VALUES (88, 63, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 88);
INSERT INTO public."Inventories" VALUES (89, 0, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 89);
INSERT INTO public."Inventories" VALUES (90, 0, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 90);
INSERT INTO public."Inventories" VALUES (91, 82, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 91);
INSERT INTO public."Inventories" VALUES (92, 89, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 92);
INSERT INTO public."Inventories" VALUES (93, 95, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 93);
INSERT INTO public."Inventories" VALUES (94, 102, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 94);
INSERT INTO public."Inventories" VALUES (95, 0, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 95);
INSERT INTO public."Inventories" VALUES (96, 0, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 96);
INSERT INTO public."Inventories" VALUES (97, 121, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 97);
INSERT INTO public."Inventories" VALUES (98, 128, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 98);
INSERT INTO public."Inventories" VALUES (99, 134, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 99);
INSERT INTO public."Inventories" VALUES (100, 141, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 100);
INSERT INTO public."Inventories" VALUES (101, 0, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 101);
INSERT INTO public."Inventories" VALUES (102, 0, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 102);
INSERT INTO public."Inventories" VALUES (103, 160, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 103);
INSERT INTO public."Inventories" VALUES (104, 167, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 104);
INSERT INTO public."Inventories" VALUES (105, 173, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 105);
INSERT INTO public."Inventories" VALUES (106, 180, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 106);
INSERT INTO public."Inventories" VALUES (107, 0, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 107);
INSERT INTO public."Inventories" VALUES (108, 0, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 108);
INSERT INTO public."Inventories" VALUES (109, 199, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 109);
INSERT INTO public."Inventories" VALUES (110, 25, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 110);
INSERT INTO public."Inventories" VALUES (111, 31, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 111);
INSERT INTO public."Inventories" VALUES (112, 38, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 112);
INSERT INTO public."Inventories" VALUES (113, 0, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 113);
INSERT INTO public."Inventories" VALUES (114, 0, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 114);
INSERT INTO public."Inventories" VALUES (115, 57, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 115);
INSERT INTO public."Inventories" VALUES (116, 64, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 116);
INSERT INTO public."Inventories" VALUES (117, 70, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 117);
INSERT INTO public."Inventories" VALUES (118, 77, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 118);
INSERT INTO public."Inventories" VALUES (119, 0, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 119);
INSERT INTO public."Inventories" VALUES (120, 0, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 120);
INSERT INTO public."Inventories" VALUES (121, 96, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 121);
INSERT INTO public."Inventories" VALUES (122, 103, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 122);
INSERT INTO public."Inventories" VALUES (123, 109, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 123);
INSERT INTO public."Inventories" VALUES (124, 116, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 124);
INSERT INTO public."Inventories" VALUES (125, 0, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 125);
INSERT INTO public."Inventories" VALUES (126, 0, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 126);
INSERT INTO public."Inventories" VALUES (127, 135, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 127);
INSERT INTO public."Inventories" VALUES (128, 142, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 128);
INSERT INTO public."Inventories" VALUES (129, 148, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 129);
INSERT INTO public."Inventories" VALUES (130, 155, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 130);
INSERT INTO public."Inventories" VALUES (131, 0, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 131);
INSERT INTO public."Inventories" VALUES (132, 0, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 132);
INSERT INTO public."Inventories" VALUES (133, 174, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 133);
INSERT INTO public."Inventories" VALUES (134, 181, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 134);
INSERT INTO public."Inventories" VALUES (135, 187, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 135);
INSERT INTO public."Inventories" VALUES (136, 194, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 136);
INSERT INTO public."Inventories" VALUES (137, 0, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 137);
INSERT INTO public."Inventories" VALUES (138, 0, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 138);
INSERT INTO public."Inventories" VALUES (139, 32, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 139);
INSERT INTO public."Inventories" VALUES (140, 39, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 140);
INSERT INTO public."Inventories" VALUES (141, 45, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 141);
INSERT INTO public."Inventories" VALUES (142, 52, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 142);
INSERT INTO public."Inventories" VALUES (143, 0, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 143);
INSERT INTO public."Inventories" VALUES (144, 0, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 144);
INSERT INTO public."Inventories" VALUES (145, 71, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 145);
INSERT INTO public."Inventories" VALUES (146, 78, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 146);
INSERT INTO public."Inventories" VALUES (147, 84, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 147);
INSERT INTO public."Inventories" VALUES (148, 91, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 148);
INSERT INTO public."Inventories" VALUES (149, 0, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 149);
INSERT INTO public."Inventories" VALUES (150, 0, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 150);
INSERT INTO public."Inventories" VALUES (151, 110, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 151);
INSERT INTO public."Inventories" VALUES (152, 117, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 152);
INSERT INTO public."Inventories" VALUES (153, 123, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 153);
INSERT INTO public."Inventories" VALUES (154, 130, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 154);
INSERT INTO public."Inventories" VALUES (155, 0, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 155);
INSERT INTO public."Inventories" VALUES (156, 0, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 156);
INSERT INTO public."Inventories" VALUES (157, 149, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 157);
INSERT INTO public."Inventories" VALUES (158, 156, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 158);
INSERT INTO public."Inventories" VALUES (159, 162, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 159);
INSERT INTO public."Inventories" VALUES (160, 169, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 160);
INSERT INTO public."Inventories" VALUES (161, 0, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 161);
INSERT INTO public."Inventories" VALUES (162, 0, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 162);
INSERT INTO public."Inventories" VALUES (163, 188, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 163);
INSERT INTO public."Inventories" VALUES (164, 195, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 164);
INSERT INTO public."Inventories" VALUES (165, 20, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 165);
INSERT INTO public."Inventories" VALUES (166, 27, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 166);
INSERT INTO public."Inventories" VALUES (167, 0, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 167);
INSERT INTO public."Inventories" VALUES (168, 0, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 168);
INSERT INTO public."Inventories" VALUES (169, 46, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 169);
INSERT INTO public."Inventories" VALUES (170, 53, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 170);
INSERT INTO public."Inventories" VALUES (171, 59, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 171);
INSERT INTO public."Inventories" VALUES (172, 66, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 172);
INSERT INTO public."Inventories" VALUES (173, 0, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 173);
INSERT INTO public."Inventories" VALUES (174, 0, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 174);
INSERT INTO public."Inventories" VALUES (175, 85, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 175);
INSERT INTO public."Inventories" VALUES (176, 92, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 176);
INSERT INTO public."Inventories" VALUES (177, 98, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 177);
INSERT INTO public."Inventories" VALUES (178, 105, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 178);
INSERT INTO public."Inventories" VALUES (179, 0, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 179);
INSERT INTO public."Inventories" VALUES (180, 0, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 180);
INSERT INTO public."Inventories" VALUES (181, 124, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 181);
INSERT INTO public."Inventories" VALUES (182, 131, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 182);
INSERT INTO public."Inventories" VALUES (183, 137, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 183);
INSERT INTO public."Inventories" VALUES (184, 144, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 184);
INSERT INTO public."Inventories" VALUES (185, 0, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 185);
INSERT INTO public."Inventories" VALUES (186, 0, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 186);
INSERT INTO public."Inventories" VALUES (187, 163, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 187);
INSERT INTO public."Inventories" VALUES (188, 170, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 188);
INSERT INTO public."Inventories" VALUES (189, 176, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 189);
INSERT INTO public."Inventories" VALUES (190, 183, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 190);
INSERT INTO public."Inventories" VALUES (191, 0, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 191);
INSERT INTO public."Inventories" VALUES (192, 0, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 192);
INSERT INTO public."Inventories" VALUES (193, 21, 'Depósito seco - Estante 2', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 193);
INSERT INTO public."Inventories" VALUES (194, 28, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 194);
INSERT INTO public."Inventories" VALUES (195, 34, 'Depósito refrigerado - Cámara 1', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 195);
INSERT INTO public."Inventories" VALUES (196, 41, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 196);
INSERT INTO public."Inventories" VALUES (197, 0, 'Centro de distribución - Pasillo B', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 197);
INSERT INTO public."Inventories" VALUES (198, 0, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 198);
INSERT INTO public."Inventories" VALUES (199, 60, 'Depósito central - Sector C', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 199);
INSERT INTO public."Inventories" VALUES (200, 67, 'Depósito central - Sector A', '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 200);


--
-- Data for Name: Permissions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Permissions" VALUES (1, 'Crear usuario', 1, 1);
INSERT INTO public."Permissions" VALUES (2, 'Ver usuario', 1, 2);
INSERT INTO public."Permissions" VALUES (3, 'Editar usuario', 1, 3);
INSERT INTO public."Permissions" VALUES (4, 'Eliminar usuario', 1, 4);
INSERT INTO public."Permissions" VALUES (5, 'Listar usuarios', 1, 5);
INSERT INTO public."Permissions" VALUES (6, 'Activar / desactivar usuario', 1, 6);
INSERT INTO public."Permissions" VALUES (12, 'Crear rol', 3, 1);
INSERT INTO public."Permissions" VALUES (13, 'Ver rol', 3, 2);
INSERT INTO public."Permissions" VALUES (14, 'Editar rol', 3, 3);
INSERT INTO public."Permissions" VALUES (15, 'Eliminar rol', 3, 4);
INSERT INTO public."Permissions" VALUES (16, 'Listar roles', 3, 5);
INSERT INTO public."Permissions" VALUES (17, 'Asignar permisos a roles', 3, 7);
INSERT INTO public."Permissions" VALUES (18, 'Crear artículo', 4, 1);
INSERT INTO public."Permissions" VALUES (19, 'Ver artículo', 4, 2);
INSERT INTO public."Permissions" VALUES (20, 'Editar artículo', 4, 3);
INSERT INTO public."Permissions" VALUES (21, 'Eliminar artículo', 4, 4);
INSERT INTO public."Permissions" VALUES (22, 'Listar artículos', 4, 5);
INSERT INTO public."Permissions" VALUES (23, 'Crear donación', 5, 1);
INSERT INTO public."Permissions" VALUES (24, 'Ver donación', 5, 2);
INSERT INTO public."Permissions" VALUES (26, 'Listar donaciones', 5, 5);
INSERT INTO public."Permissions" VALUES (27, 'Agregar item a donación', 6, 1);
INSERT INTO public."Permissions" VALUES (28, 'Ver items de donación', 6, 2);
INSERT INTO public."Permissions" VALUES (29, 'Editar item', 6, 3);
INSERT INTO public."Permissions" VALUES (31, 'Registrar necesidad', 7, 1);
INSERT INTO public."Permissions" VALUES (32, 'Ver necesidad', 7, 2);
INSERT INTO public."Permissions" VALUES (33, 'Actualizar necesidad', 7, 3);
INSERT INTO public."Permissions" VALUES (34, 'Eliminar necesidad', 7, 4);
INSERT INTO public."Permissions" VALUES (35, 'Listar necesidades', 7, 5);
INSERT INTO public."Permissions" VALUES (36, 'Registrar ingreso a inventario', 8, 1);
INSERT INTO public."Permissions" VALUES (37, 'Ver inventario', 8, 2);
INSERT INTO public."Permissions" VALUES (39, 'Listar inventario', 8, 5);
INSERT INTO public."Permissions" VALUES (25, 'Actualizar estado de donación', 5, 9);
INSERT INTO public."Permissions" VALUES (38, 'Actualizar inventario', 8, 3);
INSERT INTO public."Permissions" VALUES (7, 'Crear institución', 2, 1);
INSERT INTO public."Permissions" VALUES (8, 'Ver institución', 2, 2);
INSERT INTO public."Permissions" VALUES (9, 'Editar institución', 2, 3);
INSERT INTO public."Permissions" VALUES (10, 'Eliminar institución', 2, 4);
INSERT INTO public."Permissions" VALUES (11, 'Listar instituciones', 2, 5);
INSERT INTO public."Permissions" VALUES (30, 'Eliminar item', 6, 4);
INSERT INTO public."Permissions" VALUES (40, 'Resolver necesidad', 7, 6);
INSERT INTO public."Permissions" VALUES (41, 'Actualizar donacion', 5, 3);
INSERT INTO public."Permissions" VALUES (42, 'Asignar donacion', 5, 7);
INSERT INTO public."Permissions" VALUES (43, 'Eliminar donacion', 5, 4);
INSERT INTO public."Permissions" VALUES (44, 'Actualizar estado de la necesidad', 7, 9);
INSERT INTO public."Permissions" VALUES (45, 'Crear Tipo de institucion', 9, 1);
INSERT INTO public."Permissions" VALUES (46, 'Ver un Tipo de institucion', 9, 2);
INSERT INTO public."Permissions" VALUES (47, 'Listas los TIpos de instituciones', 9, 5);
INSERT INTO public."Permissions" VALUES (48, 'Actualizar Tipo de institucion', 9, 3);
INSERT INTO public."Permissions" VALUES (49, 'Eliminar Tipo de institucion', 9, 4);


--
-- Data for Name: RolePermissions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."RolePermissions" VALUES (1, 1);
INSERT INTO public."RolePermissions" VALUES (1, 2);
INSERT INTO public."RolePermissions" VALUES (1, 3);
INSERT INTO public."RolePermissions" VALUES (1, 4);
INSERT INTO public."RolePermissions" VALUES (1, 5);
INSERT INTO public."RolePermissions" VALUES (1, 6);
INSERT INTO public."RolePermissions" VALUES (1, 7);
INSERT INTO public."RolePermissions" VALUES (1, 8);
INSERT INTO public."RolePermissions" VALUES (1, 9);
INSERT INTO public."RolePermissions" VALUES (1, 10);
INSERT INTO public."RolePermissions" VALUES (1, 11);
INSERT INTO public."RolePermissions" VALUES (1, 12);
INSERT INTO public."RolePermissions" VALUES (1, 13);
INSERT INTO public."RolePermissions" VALUES (1, 14);
INSERT INTO public."RolePermissions" VALUES (1, 15);
INSERT INTO public."RolePermissions" VALUES (1, 16);
INSERT INTO public."RolePermissions" VALUES (1, 17);
INSERT INTO public."RolePermissions" VALUES (1, 18);
INSERT INTO public."RolePermissions" VALUES (1, 19);
INSERT INTO public."RolePermissions" VALUES (1, 20);
INSERT INTO public."RolePermissions" VALUES (1, 21);
INSERT INTO public."RolePermissions" VALUES (1, 22);
INSERT INTO public."RolePermissions" VALUES (1, 23);
INSERT INTO public."RolePermissions" VALUES (1, 24);
INSERT INTO public."RolePermissions" VALUES (1, 25);
INSERT INTO public."RolePermissions" VALUES (1, 26);
INSERT INTO public."RolePermissions" VALUES (1, 27);
INSERT INTO public."RolePermissions" VALUES (1, 28);
INSERT INTO public."RolePermissions" VALUES (1, 29);
INSERT INTO public."RolePermissions" VALUES (1, 30);
INSERT INTO public."RolePermissions" VALUES (1, 31);
INSERT INTO public."RolePermissions" VALUES (1, 32);
INSERT INTO public."RolePermissions" VALUES (1, 33);
INSERT INTO public."RolePermissions" VALUES (1, 34);
INSERT INTO public."RolePermissions" VALUES (1, 35);
INSERT INTO public."RolePermissions" VALUES (1, 36);
INSERT INTO public."RolePermissions" VALUES (1, 37);
INSERT INTO public."RolePermissions" VALUES (1, 38);
INSERT INTO public."RolePermissions" VALUES (1, 39);
INSERT INTO public."RolePermissions" VALUES (3, 2);
INSERT INTO public."RolePermissions" VALUES (3, 6);
INSERT INTO public."RolePermissions" VALUES (3, 7);
INSERT INTO public."RolePermissions" VALUES (3, 8);
INSERT INTO public."RolePermissions" VALUES (3, 9);
INSERT INTO public."RolePermissions" VALUES (3, 31);
INSERT INTO public."RolePermissions" VALUES (3, 32);
INSERT INTO public."RolePermissions" VALUES (3, 33);
INSERT INTO public."RolePermissions" VALUES (3, 18);
INSERT INTO public."RolePermissions" VALUES (3, 19);
INSERT INTO public."RolePermissions" VALUES (3, 20);
INSERT INTO public."RolePermissions" VALUES (3, 23);
INSERT INTO public."RolePermissions" VALUES (3, 24);
INSERT INTO public."RolePermissions" VALUES (3, 25);
INSERT INTO public."RolePermissions" VALUES (3, 27);
INSERT INTO public."RolePermissions" VALUES (3, 28);
INSERT INTO public."RolePermissions" VALUES (3, 29);
INSERT INTO public."RolePermissions" VALUES (3, 37);
INSERT INTO public."RolePermissions" VALUES (3, 38);
INSERT INTO public."RolePermissions" VALUES (2, 31);
INSERT INTO public."RolePermissions" VALUES (2, 32);
INSERT INTO public."RolePermissions" VALUES (2, 33);
INSERT INTO public."RolePermissions" VALUES (2, 19);
INSERT INTO public."RolePermissions" VALUES (2, 23);
INSERT INTO public."RolePermissions" VALUES (2, 24);
INSERT INTO public."RolePermissions" VALUES (2, 25);
INSERT INTO public."RolePermissions" VALUES (2, 27);
INSERT INTO public."RolePermissions" VALUES (2, 28);
INSERT INTO public."RolePermissions" VALUES (2, 37);
INSERT INTO public."RolePermissions" VALUES (4, 31);
INSERT INTO public."RolePermissions" VALUES (4, 32);
INSERT INTO public."RolePermissions" VALUES (4, 33);
INSERT INTO public."RolePermissions" VALUES (4, 34);
INSERT INTO public."RolePermissions" VALUES (4, 35);
INSERT INTO public."RolePermissions" VALUES (4, 24);
INSERT INTO public."RolePermissions" VALUES (4, 26);
INSERT INTO public."RolePermissions" VALUES (3, 26);
INSERT INTO public."RolePermissions" VALUES (3, 40);
INSERT INTO public."RolePermissions" VALUES (2, 40);
INSERT INTO public."RolePermissions" VALUES (3, 41);
INSERT INTO public."RolePermissions" VALUES (1, 41);
INSERT INTO public."RolePermissions" VALUES (3, 42);
INSERT INTO public."RolePermissions" VALUES (1, 40);
INSERT INTO public."RolePermissions" VALUES (1, 42);
INSERT INTO public."RolePermissions" VALUES (1, 43);
INSERT INTO public."RolePermissions" VALUES (1, 44);
INSERT INTO public."RolePermissions" VALUES (1, 45);
INSERT INTO public."RolePermissions" VALUES (1, 46);
INSERT INTO public."RolePermissions" VALUES (1, 47);
INSERT INTO public."RolePermissions" VALUES (1, 48);


--
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Roles" VALUES (1, 'Admin', 'Acceso total');
INSERT INTO public."Roles" VALUES (2, 'Operador', 'Gestiona donaciones y registros');
INSERT INTO public."Roles" VALUES (3, 'Coordinador', 'Coordina logística y aprobaciones');
INSERT INTO public."Roles" VALUES (4, 'Institución', 'Instituciones externas (donantes o receptoras)');
INSERT INTO public."Roles" VALUES (5, 'Voluntario', 'Usuario que dona o participa');


--
-- Data for Name: Types; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Types" VALUES (1, 'BAA');
INSERT INTO public."Types" VALUES (2, 'Cooperativa');
INSERT INTO public."Types" VALUES (3, 'Mayorista');
INSERT INTO public."Types" VALUES (4, 'ONG');
INSERT INTO public."Types" VALUES (5, 'Particular');
INSERT INTO public."Types" VALUES (6, 'Supermercado');
INSERT INTO public."Types" VALUES (7, 'Comedor');
INSERT INTO public."Types" VALUES (8, 'Merendero');
INSERT INTO public."Types" VALUES (9, 'Hogar de Ancianos');
INSERT INTO public."Types" VALUES (10, 'Hogar de Niños');


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Users" VALUES (1, 'Admin', 'SOLIDATA', 'admin@example.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '0000000000', true, '2026-10-30 18:58:31.576684-03', '2026-10-30 18:58:31.576684-03', 1, NULL);
INSERT INTO public."Users" VALUES (2, 'Lucía', 'Gómez', 'contacto.receptor01@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0001', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 1);
INSERT INTO public."Users" VALUES (3, 'Mateo', 'Fernández', 'contacto.receptor02@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0002', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 2);
INSERT INTO public."Users" VALUES (4, 'Valentina', 'Rodríguez', 'contacto.receptor03@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0003', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 3);
INSERT INTO public."Users" VALUES (5, 'Tomás', 'López', 'contacto.receptor04@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0004', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 4);
INSERT INTO public."Users" VALUES (6, 'Sofía', 'Martínez', 'contacto.receptor05@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0005', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 5);
INSERT INTO public."Users" VALUES (7, 'Joaquín', 'Díaz', 'contacto.receptor06@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0006', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 6);
INSERT INTO public."Users" VALUES (8, 'Martina', 'Pérez', 'contacto.receptor07@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0007', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 7);
INSERT INTO public."Users" VALUES (9, 'Benjamín', 'Sánchez', 'contacto.receptor08@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0008', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 8);
INSERT INTO public."Users" VALUES (10, 'Camila', 'Romero', 'contacto.receptor09@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0009', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 9);
INSERT INTO public."Users" VALUES (11, 'Felipe', 'Álvarez', 'contacto.receptor10@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0010', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 10);
INSERT INTO public."Users" VALUES (12, 'Julieta', 'Torres', 'contacto.receptor11@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0011', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 11);
INSERT INTO public."Users" VALUES (13, 'Nicolás', 'Ruiz', 'contacto.receptor12@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0012', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 12);
INSERT INTO public."Users" VALUES (14, 'Emilia', 'Ramírez', 'contacto.receptor13@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0013', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 13);
INSERT INTO public."Users" VALUES (15, 'Lautaro', 'Flores', 'contacto.receptor14@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0014', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 14);
INSERT INTO public."Users" VALUES (16, 'Renata', 'Acosta', 'contacto.receptor15@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0015', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 15);
INSERT INTO public."Users" VALUES (17, 'Facundo', 'Benítez', 'contacto.receptor16@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0016', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 16);
INSERT INTO public."Users" VALUES (18, 'Milagros', 'Medina', 'contacto.receptor17@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0017', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 17);
INSERT INTO public."Users" VALUES (19, 'Agustín', 'Herrera', 'contacto.receptor18@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0018', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 18);
INSERT INTO public."Users" VALUES (20, 'Clara', 'Suárez', 'contacto.receptor19@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0019', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 19);
INSERT INTO public."Users" VALUES (21, 'Ignacio', 'Molina', 'contacto.receptor20@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0020', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 20);
INSERT INTO public."Users" VALUES (22, 'Micaela', 'Castro', 'contacto.receptor21@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0021', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 21);
INSERT INTO public."Users" VALUES (23, 'Santiago', 'Ortiz', 'contacto.receptor22@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0022', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 22);
INSERT INTO public."Users" VALUES (24, 'Abril', 'Silva', 'contacto.receptor23@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0023', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 23);
INSERT INTO public."Users" VALUES (25, 'Bautista', 'Núñez', 'contacto.receptor24@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0024', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 24);
INSERT INTO public."Users" VALUES (26, 'Florencia', 'Rojas', 'contacto.receptor25@comedores.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0025', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 25);
INSERT INTO public."Users" VALUES (27, 'Lucía', 'López', 'donaciones.organizacion01@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0026', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 26);
INSERT INTO public."Users" VALUES (28, 'Benjamín', 'Acosta', 'donaciones.organizacion02@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0027', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 27);
INSERT INTO public."Users" VALUES (29, 'Renata', 'Gómez', 'donaciones.organizacion03@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0028', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 28);
INSERT INTO public."Users" VALUES (30, 'Santiago', 'Ruiz', 'donaciones.organizacion04@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0029', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 29);
INSERT INTO public."Users" VALUES (31, 'Tomás', 'Silva', 'donaciones.organizacion05@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0030', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 30);
INSERT INTO public."Users" VALUES (32, 'Julieta', 'Romero', 'donaciones.organizacion06@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0031', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 31);
INSERT INTO public."Users" VALUES (33, 'Agustín', 'Molina', 'donaciones.organizacion07@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0032', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 32);
INSERT INTO public."Users" VALUES (34, 'Florencia', 'Díaz', 'donaciones.organizacion08@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0033', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 33);
INSERT INTO public."Users" VALUES (35, 'Martina', 'Medina', 'donaciones.organizacion09@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0034', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 34);
INSERT INTO public."Users" VALUES (36, 'Lautaro', 'Rodríguez', 'donaciones.organizacion10@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0035', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 35);
INSERT INTO public."Users" VALUES (37, 'Micaela', 'Flores', 'donaciones.organizacion11@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0036', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 36);
INSERT INTO public."Users" VALUES (38, 'Valentina', 'Rojas', 'donaciones.organizacion12@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0037', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 37);
INSERT INTO public."Users" VALUES (39, 'Felipe', 'Torres', 'donaciones.organizacion13@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0038', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 38);
INSERT INTO public."Users" VALUES (40, 'Milagros', 'Ortiz', 'donaciones.organizacion14@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0039', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 39);
INSERT INTO public."Users" VALUES (41, 'Bautista', 'Sánchez', 'donaciones.organizacion15@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0040', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 40);
INSERT INTO public."Users" VALUES (42, 'Joaquín', 'Suárez', 'donaciones.organizacion16@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0041', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 41);
INSERT INTO public."Users" VALUES (43, 'Emilia', 'Martínez', 'donaciones.organizacion17@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0042', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 42);
INSERT INTO public."Users" VALUES (44, 'Ignacio', 'Benítez', 'donaciones.organizacion18@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0043', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 43);
INSERT INTO public."Users" VALUES (45, 'Mateo', 'Fernández', 'donaciones.organizacion19@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0044', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 44);
INSERT INTO public."Users" VALUES (46, 'Camila', 'Ramírez', 'donaciones.organizacion20@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0045', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 45);
INSERT INTO public."Users" VALUES (47, 'Facundo', 'Núñez', 'donaciones.organizacion21@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0046', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 46);
INSERT INTO public."Users" VALUES (48, 'Abril', 'Álvarez', 'donaciones.organizacion22@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0047', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 47);
INSERT INTO public."Users" VALUES (49, 'Sofía', 'Castro', 'donaciones.organizacion23@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0048', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 48);
INSERT INTO public."Users" VALUES (50, 'Nicolás', 'Pérez', 'donaciones.organizacion24@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0049', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 49);
INSERT INTO public."Users" VALUES (51, 'Clara', 'Herrera', 'donaciones.organizacion25@donantes.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4100-0050', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 4, 50);
INSERT INTO public."Users" VALUES (52, 'Carolina', 'Vega', 'operaciones.operador01@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0001', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (53, 'Diego', 'Cabrera', 'operaciones.operador02@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0002', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (54, 'Paula', 'Roldán', 'operaciones.operador03@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0003', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (55, 'Mariano', 'Ibarra', 'operaciones.operador04@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0004', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (56, 'Verónica', 'Ponce', 'operaciones.operador05@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0005', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (57, 'Gabriel', 'Sosa', 'operaciones.operador06@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0006', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (58, 'Natalia', 'Vázquez', 'operaciones.operador07@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0007', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (59, 'Federico', 'Méndez', 'operaciones.operador08@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0008', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (60, 'Lorena', 'Arias', 'operaciones.operador09@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0009', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (61, 'Pablo', 'Peralta', 'operaciones.operador10@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0010', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (62, 'Daniela', 'Quiroga', 'operaciones.operador11@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0011', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (63, 'Esteban', 'Domínguez', 'operaciones.operador12@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0012', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (64, 'Silvina', 'Figueroa', 'operaciones.operador13@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0013', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (65, 'Gonzalo', 'Cáceres', 'operaciones.operador14@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0014', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (66, 'Cecilia', 'Paredes', 'operaciones.operador15@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0015', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (67, 'Leandro', 'Luna', 'operaciones.operador16@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0016', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (68, 'Rocío', 'Correa', 'operaciones.operador17@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0017', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (69, 'Martín', 'Mansilla', 'operaciones.operador18@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0018', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (70, 'Andrea', 'Ferreyra', 'operaciones.operador19@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0019', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (71, 'Ramiro', 'Navarro', 'operaciones.operador20@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0020', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (72, 'Belén', 'Godoy', 'operaciones.operador21@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0021', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (73, 'Ezequiel', 'Campos', 'operaciones.operador22@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0022', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (74, 'Florencia', 'Vera', 'operaciones.operador23@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0023', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (75, 'Hernán', 'Aguirre', 'operaciones.operador24@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0024', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);
INSERT INTO public."Users" VALUES (76, 'Noelia', 'Bravo', 'operaciones.operador25@baa.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '+54 11 4200-0025', true, '2026-10-30 18:58:32.092418-03', '2026-10-30 18:58:32.092418-03', 2, NULL);


--
-- Name: Actions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Actions_id_seq"', 9, true);


--
-- Name: Articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Articles_id_seq"', 28, true);


--
-- Name: DonationItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."DonationItems_id_seq"', 200, true);


--
-- Name: Donations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Donations_id_seq"', 100, true);


--
-- Name: Entities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Entities_id_seq"', 11, true);


--
-- Name: InstitutionsNeeds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."InstitutionsNeeds_id_seq"', 50, true);


--
-- Name: Institutions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Institutions_id_seq"', 50, true);


--
-- Name: Inventories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Inventories_id_seq"', 200, true);


--
-- Name: Permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Permissions_id_seq"', 50, true);


--
-- Name: Roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Roles_id_seq"', 10, true);


--
-- Name: Types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Types_id_seq"', 11, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Users_id_seq"', 76, true);


--
-- Name: Actions Actions_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Actions"
    ADD CONSTRAINT "Actions_name_key" UNIQUE (name);


--
-- Name: Actions Actions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Actions"
    ADD CONSTRAINT "Actions_pkey" PRIMARY KEY (id);


--
-- Name: Articles Articles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Articles"
    ADD CONSTRAINT "Articles_pkey" PRIMARY KEY (id);


--
-- Name: DonationItems DonationItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DonationItems"
    ADD CONSTRAINT "DonationItems_pkey" PRIMARY KEY (id);


--
-- Name: Donations Donations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Donations"
    ADD CONSTRAINT "Donations_pkey" PRIMARY KEY (id);


--
-- Name: Entities Entities_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Entities"
    ADD CONSTRAINT "Entities_name_key" UNIQUE (name);


--
-- Name: Entities Entities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Entities"
    ADD CONSTRAINT "Entities_pkey" PRIMARY KEY (id);


--
-- Name: InstitutionsNeeds InstitutionsNeeds_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."InstitutionsNeeds"
    ADD CONSTRAINT "InstitutionsNeeds_pkey" PRIMARY KEY (id);


--
-- Name: Institutions Institutions_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Institutions"
    ADD CONSTRAINT "Institutions_name_key" UNIQUE (name);


--
-- Name: Institutions Institutions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Institutions"
    ADD CONSTRAINT "Institutions_pkey" PRIMARY KEY (id);


--
-- Name: Inventories Inventories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Inventories"
    ADD CONSTRAINT "Inventories_pkey" PRIMARY KEY (id);


--
-- Name: Permissions Permissions_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Permissions"
    ADD CONSTRAINT "Permissions_name_key" UNIQUE (name);


--
-- Name: Permissions Permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Permissions"
    ADD CONSTRAINT "Permissions_pkey" PRIMARY KEY (id);


--
-- Name: RolePermissions RolePermissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RolePermissions"
    ADD CONSTRAINT "RolePermissions_pkey" PRIMARY KEY (role_id, permission_id);


--
-- Name: Roles Roles_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key" UNIQUE (name);


--
-- Name: Roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);


--
-- Name: Types Types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Types"
    ADD CONSTRAINT "Types_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: DonationItems DonationItems_article_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DonationItems"
    ADD CONSTRAINT "DonationItems_article_id_fkey" FOREIGN KEY (article_id) REFERENCES public."Articles"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: DonationItems DonationItems_donation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DonationItems"
    ADD CONSTRAINT "DonationItems_donation_id_fkey" FOREIGN KEY (donation_id) REFERENCES public."Donations"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donations Donations_donor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Donations"
    ADD CONSTRAINT "Donations_donor_id_fkey" FOREIGN KEY (donor_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donations Donations_receiver_institution_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Donations"
    ADD CONSTRAINT "Donations_receiver_institution_id_fkey" FOREIGN KEY (receiver_institution_id) REFERENCES public."Institutions"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donations Donations_responsable_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Donations"
    ADD CONSTRAINT "Donations_responsable_user_id_fkey" FOREIGN KEY (responsable_user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: InstitutionsNeeds InstitutionsNeeds_article_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."InstitutionsNeeds"
    ADD CONSTRAINT "InstitutionsNeeds_article_id_fkey" FOREIGN KEY (article_id) REFERENCES public."Articles"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: InstitutionsNeeds InstitutionsNeeds_institution_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."InstitutionsNeeds"
    ADD CONSTRAINT "InstitutionsNeeds_institution_id_fkey" FOREIGN KEY (institution_id) REFERENCES public."Institutions"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Institutions Institutions_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Institutions"
    ADD CONSTRAINT "Institutions_type_id_fkey" FOREIGN KEY (type_id) REFERENCES public."Types"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Inventories Inventories_donation_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Inventories"
    ADD CONSTRAINT "Inventories_donation_item_id_fkey" FOREIGN KEY (donation_item_id) REFERENCES public."DonationItems"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Permissions Permissions_action_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Permissions"
    ADD CONSTRAINT "Permissions_action_id_fkey" FOREIGN KEY (action_id) REFERENCES public."Actions"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Permissions Permissions_entity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Permissions"
    ADD CONSTRAINT "Permissions_entity_id_fkey" FOREIGN KEY (entity_id) REFERENCES public."Entities"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: RolePermissions RolePermissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RolePermissions"
    ADD CONSTRAINT "RolePermissions_permission_id_fkey" FOREIGN KEY (permission_id) REFERENCES public."Permissions"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: RolePermissions RolePermissions_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RolePermissions"
    ADD CONSTRAINT "RolePermissions_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Roles"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Users Users_institution_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_institution_id_fkey" FOREIGN KEY (institution_id) REFERENCES public."Institutions"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Users Users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Roles"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--


-- Coordenadas y trazabilidad de geocodificacion utilizadas por el mapa SOLIDATA.
ALTER TABLE public."Institutions"
    ADD COLUMN IF NOT EXISTS latitude double precision,
    ADD COLUMN IF NOT EXISTS longitude double precision,
    ADD COLUMN IF NOT EXISTS location_checked_at timestamp with time zone,
    ADD COLUMN IF NOT EXISTS location_accuracy character varying(20);
-- Instituciones adicionales para probar los marcadores del mapa.
-- Instituciones ficticias opcionales para probar los marcadores del mapa en CABA.
-- Las ubicaciones son localidades, no direcciones exactas. El mapa las mostrará
-- como aproximadas al centro de cada localidad tras ejecutar “Revisar direcciones”.
-- Este bloque forma parte del script completo de datos de prueba.

INSERT INTO public."Institutions" (name, location, "institutionType", status)
VALUES
  ('Comedor Comunitario Puentes de Barracas', 'Barracas, Ciudad Autónoma de Buenos Aires', 'Recipient', 'Active'),
  ('Centro Vecinal La Esperanza de La Boca', 'La Boca, Ciudad Autónoma de Buenos Aires', 'Recipient', 'Active'),
  ('Merendero Ronda de Flores', 'Flores, Ciudad Autónoma de Buenos Aires', 'Recipient', 'Active'),
  ('Asociación Solidaria Parque Patricios', 'Parque Patricios, Ciudad Autónoma de Buenos Aires', 'Recipient', 'Active'),
  ('Centro Comunitario Los Aromos de Mataderos', 'Mataderos, Ciudad Autónoma de Buenos Aires', 'Recipient', 'Active')
ON CONFLICT (name) DO NOTHING;



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



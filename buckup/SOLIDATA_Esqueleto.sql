-- SOLIDATA | Esqueleto de base de datos PostgreSQL
-- Esquema completo + datos base + un usuario administrador (contrasena inicial: 123).
-- Ejecutar sobre una base vacia en DBeaver.
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
INSERT INTO public."Actions" VALUES (1, 'CREATE', 'Crear un recurso');
INSERT INTO public."Actions" VALUES (2, 'READ', 'Leer un recurso');
INSERT INTO public."Actions" VALUES (3, 'UPDATE', 'Modificar un recurso');
INSERT INTO public."Actions" VALUES (4, 'DELETE', 'Eliminar un recurso');
INSERT INTO public."Actions" VALUES (5, 'LIST', 'Listar múltiples recursos');
INSERT INTO public."Actions" VALUES (6, 'APPROVE', 'Aprobar solicitudes');
INSERT INTO public."Actions" VALUES (7, 'ASSIGN', 'Asignar roles o permisos');
INSERT INTO public."Actions" VALUES (9, 'CHANGE_STATUS', 'Cambiar estado de un recurso');
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
INSERT INTO public."Entities" VALUES (4, 'ARTICLES', 'Gestión de artículos y variantes');
INSERT INTO public."Entities" VALUES (1, 'USERS', 'Gestión de usuarios');
INSERT INTO public."Entities" VALUES (2, 'INSTITUTIONS', 'Gestión de instituciones');
INSERT INTO public."Entities" VALUES (3, 'ROLES', 'Gestión de roles del sistema');
INSERT INTO public."Entities" VALUES (5, 'DONATIONS', 'Registro y gestión de donaciones');
INSERT INTO public."Entities" VALUES (6, 'DONATIONITEMS', 'Artículos dentro de donaciones');
INSERT INTO public."Entities" VALUES (7, 'INSTITUTIONNEEDS', 'Necesidades de instituciones');
INSERT INTO public."Entities" VALUES (8, 'INVENTORIES', 'Inventario general del sistema');
INSERT INTO public."Entities" VALUES (9, 'TYPES', 'Tipos de instituciones');
INSERT INTO public."Roles" VALUES (1, 'Admin', 'Acceso total');
INSERT INTO public."Roles" VALUES (2, 'Operador', 'Gestiona donaciones y registros');
INSERT INTO public."Roles" VALUES (3, 'Coordinador', 'Coordina logística y aprobaciones');
INSERT INTO public."Roles" VALUES (4, 'Institución', 'Instituciones externas (donantes o receptoras)');
INSERT INTO public."Roles" VALUES (5, 'Voluntario', 'Usuario que dona o participa');
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
INSERT INTO public."Users" VALUES (1, 'Admin', 'SOLIDATA', 'admin@example.invalid', '$2b$10$tSDD5Xjy5k9rNLw9Bl85OuHX2O8v2eUgeJR/mEgpwteNZ2xzl1K1C', '0000000000', true, '2026-10-30 18:58:31.576684-03', '2026-10-30 18:58:31.576684-03', 1, NULL);
SELECT setval('public."Actions_id_seq"', (SELECT MAX(id) FROM public."Actions"), true);
SELECT setval('public."Articles_id_seq"', (SELECT MAX(id) FROM public."Articles"), true);
SELECT setval('public."Entities_id_seq"', (SELECT MAX(id) FROM public."Entities"), true);
SELECT setval('public."Roles_id_seq"', (SELECT MAX(id) FROM public."Roles"), true);
SELECT setval('public."Types_id_seq"', (SELECT MAX(id) FROM public."Types"), true);
SELECT setval('public."Permissions_id_seq"', (SELECT MAX(id) FROM public."Permissions"), true);
SELECT setval('public."Users_id_seq"', (SELECT MAX(id) FROM public."Users"), true);


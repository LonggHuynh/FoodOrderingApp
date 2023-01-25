create table public.app_user
(
    id text not null
        constraint customer_pk
            primary key
);

create table public.restaurant
(
    id             text not null
        constraint chef_pk
            primary key,
    name           text not null,
    logo_url       text,
    delivery_cost  numeric default 0,
    background_url text,
    min_order      integer default 0
);

create table public.dish
(
    id            uuid    not null
        constraint dish_pk
            primary key,
    name          text    not null,
    description   text    not null,
    restaurant_id text
        constraint dish_restaurant_id_fk
            references public.restaurant,
    img           text,
    price         numeric not null,
    category      text default 'Others'::text
);

create table public.app_order
(
    id            uuid not null
        constraint order_pk
            primary key,
    uid           text
        constraint app_order_app_user_id_fk
            references public.app_user,
    rating        integer,
    restaurant_id text not null
        constraint app_order_restaurant_id_fk
            references public.restaurant,
    date          timestamp default CURRENT_TIMESTAMP,
    name          text not null,
    email         text,
    address       text
);

create table public.ordered_item
(
    order_id uuid    not null
        constraint ordered_item_app_order_id_fk
            references public.app_order,
    quantity integer not null,
    dish_id  uuid    not null
        constraint ordered_item_dish_id_fk
            references public.dish,
    constraint ordered_item_pk
        primary key (order_id, dish_id)
);


UPDATE auth.users
SET encrypted_password = crypt('Sprinteramg124', gen_salt('bf')),
    updated_at = now()
WHERE email = 'andreas@houseofservice.se';
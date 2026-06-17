UPDATE auth.users
SET encrypted_password = crypt('JosefAdminFrukt124!', gen_salt('bf')),
    updated_at = now()
WHERE email = 'admin@vitaminkorgen.se';
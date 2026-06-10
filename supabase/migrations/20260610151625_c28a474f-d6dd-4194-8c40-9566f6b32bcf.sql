DO $$
DECLARE
  u RECORD;
  new_uid uuid;
BEGIN
  FOR u IN SELECT * FROM (VALUES
    ('robin.eriksson@heidelbergmaterials.com','Heidelbergmaterials','Robin Eriksson','Heidelbergmaterials123'),
    ('ridjeen.amir@heidelbergmaterials.com','Heidelbergmaterials','Ridjeen Amir','Heidelbergmaterials123'),
    ('max.lindeskog@heidelbergmaterials.com','Heidelbergmaterials','Max Lindeskog','Heidelbergmaterials123'),
    ('johan.lindeskog@betongindustri.se','Betongindustri','Johan Lindeskog','Betongindustri123'),
    ('clara@viasales.com','Viasales','Clara','Viasales123'),
    ('salar@viasales.com','Viasales','Salar','Viasales123'),
    ('theresa.wigstrand@famlak.se','Famlak','Theresa Wigstrand','Famlak123'),
    ('anna-lena.forssen@famlak.se','Famlak','Anna-Lena Forssen','Famlak123'),
    ('pia@sundentallabs.se','Sundentallabs','Pia','Sundentallabs123'),
    ('nettan.lindqvist@bstab.com','Bstab','Nettan Lindqvist','Bstab123'),
    ('asa.leavey@optimera.se','Optimera','Åsa Leavey','Optimera123'),
    ('johanna.romano@bratt-trading.se','Bratt-Trading','Johanna Romano','Bratttrading123'),
    ('cvijetin.g@hagmansbilservice.se','Hagmansbilservice','Cvijetin G','Hagmansbilservice123'),
    ('adam@maree.se','Maree','Adam','Maree123'),
    ('ulrika@inventprojekt.se','Inventprojekt','Ulrika','Inventprojekt123'),
    ('victoria.engstrom@tryggsam.com','Tryggsam','Victoria Engström','Tryggsam123'),
    ('viktoria.sjostedt@mentimeter.com','Mentimeter','Viktoria Sjöstedt','Mentimeter123'),
    ('johanna.irevang@svenskahus.se','Svenskahus','Johanna Irevang','Svenskahus123'),
    ('ulrika.trapp@psykologigymnasiet.se','Psykologigymnasiet','Ulrika Trapp','Psykologigymnasiet123'),
    ('sakke@nika.se','Nika','Sakke','Nika123'),
    ('joakim.carlson@officegroup.se','Officegroup','Joakim Carlson','Officegroup123')
  ) AS t(email, company, contact, password)
  LOOP
    IF EXISTS (SELECT 1 FROM auth.users WHERE email = u.email) THEN
      CONTINUE;
    END IF;
    new_uid := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', new_uid, 'authenticated', 'authenticated',
      u.email, crypt(u.password, gen_salt('bf')), now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      jsonb_build_object('company_name', u.company, 'contact_person', u.contact),
      now(), now(), '', '', '', ''
    );
    INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
    VALUES (gen_random_uuid(), new_uid, jsonb_build_object('sub', new_uid::text, 'email', u.email), 'email', new_uid::text, now(), now(), now());
  END LOOP;
END $$;
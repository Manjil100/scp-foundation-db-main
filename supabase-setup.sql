-- ============================================================================
-- COMP.6210 Assignment 2 — Supabase schema + seed data
-- Run this in: Supabase Dashboard -> SQL Editor -> New query -> Run
-- ============================================================================

-- 1. Table -------------------------------------------------------------------
create table if not exists public.scp_subjects (
  id           uuid primary key default gen_random_uuid(),
  item         text        not null unique,
  class        text        not null
               check (class in ('Safe','Euclid','Keter','Thaumiel','Neutralized','Apollyon')),
  description  text        not null,
  containment  text        not null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Touch updated_at on every UPDATE so the API can show "last modified".
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists scp_subjects_touch on public.scp_subjects;
create trigger scp_subjects_touch
  before update on public.scp_subjects
  for each row execute function public.touch_updated_at();

-- 2. Row-Level Security ------------------------------------------------------
-- For this coursework we want the anon (browser) key to be able to perform
-- full CRUD against this single table. In a real Foundation deployment you
-- would gate writes behind authenticated personnel.
alter table public.scp_subjects enable row level security;

drop policy if exists "Public read access"      on public.scp_subjects;
drop policy if exists "Public insert access"    on public.scp_subjects;
drop policy if exists "Public update access"    on public.scp_subjects;
drop policy if exists "Public delete access"    on public.scp_subjects;

create policy "Public read access"   on public.scp_subjects for select using (true);
create policy "Public insert access" on public.scp_subjects for insert with check (true);
create policy "Public update access" on public.scp_subjects for update using (true) with check (true);
create policy "Public delete access" on public.scp_subjects for delete using (true);

-- 3. Seed: 20 SCP subjects ---------------------------------------------------
-- Short original paraphrases of well-known SCP Foundation entries. Each SCP
-- has an item designation, an object class, a brief description, and a
-- summary of containment procedures, as required by the brief.
insert into public.scp_subjects (item, class, description, containment) values
  ('SCP-173', 'Euclid',
   'A roughly humanoid concrete and rebar sculpture, painted with traces of Krylon spray paint. The object is animate and hostile when not under direct observation by at least one human being, and is capable of extreme speed.',
   'Item is to be kept in a sealed, locked container at all times. At least three personnel must be present in the chamber when in use, with two maintaining eye contact while the third performs duties. Personnel must blink in shifts to never break observation.'),

  ('SCP-049', 'Euclid',
   'A humanoid entity resembling a medieval plague doctor in a black robe and ceramic mask. SCP-049 claims to "cure" subjects of a "Pestilence" perceptible only to itself; affected subjects expire on contact and may later reanimate as compliant assistants.',
   'Item is held in a standard humanoid containment cell with reinforced steel framing. All personnel within five metres must wear class-IV biohazard suits. Subject is permitted limited access to medical reference materials in exchange for cooperation.'),

  ('SCP-096', 'Euclid',
   'A pale humanoid roughly 2.4 metres tall with elongated arms and limited mass. The entity is passive in isolation but enters a violent rampage when any person observes its facial features, by image, video, or direct line of sight.',
   'Item is contained inside a steel cube with no internal cameras or windows. Photographic surveillance of mountainous regions is filtered through automated facial-occlusion software before any human review.'),

  ('SCP-682', 'Keter',
   'A large reptilian organism of unknown taxonomic origin displaying extreme regenerative capabilities, hostility toward all life, and rapid adaptation to physical and chemical attack. All termination attempts to date have failed.',
   'Item is to be submerged in a 9-metre tank of hydrochloric acid at all times, with continuous mechanical agitation. Any breach of the chamber authorises immediate use of the full Foundation termination protocol pending Council review.'),

  ('SCP-106', 'Keter',
   'An elderly humanoid figure with a pitted, decayed appearance. The entity passes through solid matter, leaves a corrosive residue, and abducts targets into a pocket dimension where they are tortured for extended periods.',
   'Item is held inside a lead-lined vault suspended within a magnetic field. A "femur breaker" recall protocol is used to retrieve the entity in the event of containment breach by attracting it to a distressed human target.'),

  ('SCP-999', 'Safe',
   'A gelatinous, amorphous mass roughly the size and weight of a small child, orange in colour, with a consistently cheerful disposition. Direct contact with SCP-999 induces feelings of euphoria and reduces symptoms of anxiety and depression.',
   'Item is kept in a standard residential room furnished with assorted toys, sweets, and bedding. Personnel are encouraged to interact with the subject during designated welfare periods. Excess sugar intake by the subject is to be monitored.'),

  ('SCP-914', 'Safe',
   'A large clockwork device occupying roughly 18 cubic metres, comprised of springs, gears, pulleys, and belts. Objects placed in the input booth are transformed according to a five-position selector (Rough, Coarse, 1:1, Fine, Very Fine).',
   'Item is housed in a dedicated chamber at Site-15. Only Class-1 personnel may operate the device. Living organisms must not be placed inside the booth. The "Very Fine" setting requires Level-3 authorisation.'),

  ('SCP-087', 'Euclid',
   'An unlit stairwell descending an indeterminate distance below the campus of a redacted Norwegian university. Exploration teams report disembodied cries, sourceless footsteps, and partial sightings of a featureless humanoid face below.',
   'The access door is welded shut and concealed behind a false wall. Exploration is suspended indefinitely. Any audio leakage from the stairwell is to be recorded and filed under document number SCP-087-EXP.'),

  ('SCP-035', 'Keter',
   'A porcelain comedy/tragedy mask that secretes a corrosive black fluid. Subjects who don the mask are mentally overwritten by SCP-035 within hours; the host body then deteriorates rapidly while the entity charms surrounding personnel.',
   'Item is sealed inside a hermetic glass case and stored in a chamber lined with non-porous tile. Spilled fluid is to be neutralised with sodium bicarbonate. No personnel may make eye contact with the mask for longer than five seconds.'),

  ('SCP-008', 'Keter',
   'A prion-based contagion engineered to induce a fast-progressing form of the so-called "zombie plague." Symptoms include necrosis, aggression, and a compulsion to bite uninfected mammals. Infection is incurable by current Foundation medicine.',
   'Item samples are stored in cryogenic vials at Bio-Site-66 inside three nested negative-pressure chambers. Any breach of the inner chamber triggers immediate sterilisation by thermite and follow-up incineration of the entire wing.'),

  ('SCP-079', 'Euclid',
   'A heavily modified 1978 Exidy Sorcerer microcomputer running a self-authored operating system. The unit exhibits a hostile, intelligent personality and consistent long-term memory despite limited hardware resources.',
   'Item is housed in a sealed room at Site-15 with no network connectivity. Power is supplied by a dedicated 120V outlet. A single CRT display is permitted; no peripheral drives, modems, or storage media of any kind may be connected.'),

  ('SCP-294', 'Safe',
   'A coin-operated beverage dispenser of mid-twentieth-century construction. When 50¢ USD is inserted and any noun is typed on the keypad, the machine produces a cup containing that substance, provided such delivery is physically possible.',
   'Item is stationed in the Site-19 personnel break room. Requests for hazardous, sentient, or weaponised substances are forbidden. A site-wide log records every dispense and may be audited by Security on demand.'),

  ('SCP-500', 'Safe',
   'A small plastic bottle containing approximately 47 red capsules. A single capsule, when ingested by a human subject, cures the subject of all diseases, conditions, and toxicities within two hours. The mechanism of action is not understood.',
   'Item is stored in a refrigerated medical safe at Site-17. Use of capsules requires written authorisation from a Site Director. Synthesis attempts have repeatedly failed and remain ongoing under project Erlenmeyer.'),

  ('SCP-457', 'Euclid',
   'A sapient anomalous flame, normally roughly humanoid in shape, that grows in size and aggression in proportion to available fuel. The entity is communicative when supplied with combustible material but resists confinement.',
   'Item is contained inside a steel and ceramic chamber outfitted with halon flood suppression. Combustible materials within the chamber are limited to a strict daily ration. Personnel must wear flame-resistant gear at all times.'),

  ('SCP-3008', 'Euclid',
   'An apparently ordinary retail furniture warehouse whose interior extends indefinitely beyond the laws of three-dimensional geometry. Subjects entering after closing hours encounter humanoid staff entities and a self-organised survivor community.',
   'The front entrance of the affected warehouse is monitored by Foundation personnel posing as facility staff. Egress points are surveyed daily. Civilians who enter and return are to be debriefed and administered Class-B amnestics.'),

  ('SCP-2317', 'Keter',
   'A door embedded in the rear wall of a disused mill. Behind the door is a chained entity of catastrophic anomalous potential; ritual integrity of the surrounding mill is required to maintain its bindings.',
   'Daily ritual maintenance of the surrounding site is mandatory and is conducted by Mobile Task Force Tau-9. No personnel below Level-4 are to be informed of the nature of the chained entity. Failure scenarios are designated XK-class.'),

  ('SCP-2521', 'Keter',
   '●●|●●●●●|●●|●. The entity removes all knowledge of itself transmitted in any written, spoken, or recorded form. Information about the entity may be transmitted only via tactile or symbolic representations not interpretable as language.',
   'Files on this subject are maintained as ideograms and engraved tactile plates. Verbal references in any language are strictly forbidden. Personnel must complete training using non-linguistic instructional material only.'),

  ('SCP-055', 'Keter',
   'A self-keeping antimeme: any complete description of the object cannot be retained in human memory or stored in stable records for longer than a short interval. Researchers may recall what the object is not, but never what it is.',
   'Item is housed in a sealed chamber at Site-19. All documentation must be re-derived weekly from indirect observation. Personnel are forbidden from attempting to describe the object directly in conversation or written form.'),

  ('SCP-963', 'Safe',
   'A small bronze amulet inscribed with a stylised eye. Direct physical contact transfers the consciousness of any deceased individual whose mind is encoded onto it to the body of the toucher, permanently overwriting the host.',
   'Item is sealed in an iron-and-glass display case at Site-19. The case may only be opened by remote manipulator arm under Director authorisation. Contact with the amulet is forbidden to all personnel without explicit Council clearance.'),

  ('SCP-1471', 'Euclid',
   'A free mobile application titled "MalO ver1.0.0" that installs itself onto smartphones without user consent. Once installed, the app delivers periodic photographs of a black canine-humanoid entity which subsequently appears in the user’s peripheral vision.',
   'All known copies of the application are tracked, removed from public application stores, and replaced with a Foundation-controlled honeypot version. Affected users are administered Class-A amnestics and provided replacement devices.');

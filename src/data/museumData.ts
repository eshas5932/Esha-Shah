import { EraRoom, QuizQuestion, GenerationResult, CommunityMemory } from '../types';

export const MUSEUM_ERAS: EraRoom[] = [
  {
    id: 'early-internet',
    title: 'THE EARLY INTERNET',
    subTitle: 'The Internet is New, Weird & Experimental',
    years: '1995 – 2003',
    theme: 'CRT screens, dial-up screech, visitor counters, and GeoCities glitter',
    description: 'Before algorithms and social feeds, being online was an intentional event. You waited for the phone line to clear, sat before a glowing beige CRT box, and explored personal homepages handcrafted with flaming text and marquee tags.',
    atmosphereBg: 'from-amber-950/40 via-neutral-900 to-black',
    accentColor: 'amber',
    bannerQuote: '“Mom, get off the phone! I am downloading a picture and it is already at 42%!”',
    exhibits: [
      {
        id: 'dialup-modem',
        name: '56k Dial-Up Modem & CRT Workstation',
        era: 'early-internet',
        years: '1995 – 2004',
        tagline: 'The screeching hymn of entering cyberspace',
        whatWasIt: 'A hardware modem that converted digital computer pulses into audible analog telephone signals. Connecting required listening to a dramatic symphony of beeps, bleeps, and white noise while hoping no one picked up the household landline.',
        whyItMattered: 'It was the gateway that democratized the World Wide Web for millions of households, establishing internet access as an evening ritual.',
        theMemory: 'Praying in silence that your mom wouldn’t pick up the upstairs phone while you were 3 hours into downloading an MP3 on Napster.',
        icon: 'Radio',
        previewColor: 'text-amber-400 border-amber-500/40 bg-amber-950/30',
        tags: ['Hardware', 'Soundtrack', 'Pioneering', 'Dial-Up']
      },
      {
        id: 'geocities-web',
        name: 'GeoCities & Under Construction Websites',
        era: 'early-internet',
        years: '1994 – 2009',
        tagline: 'When every homepage was a neon masterpiece',
        whatWasIt: 'Free web hosting where millions built personal homepages organized by digital “neighborhoods” like SiliconValley and Area51. Filled with Comic Sans, animated fire GIFs, MIDI music, and hit counters.',
        whyItMattered: 'The first time ordinary humans had a blank digital canvas to express their passions without corporate templates or algorithmic curation.',
        theMemory: 'Adding a "Best viewed in 800x600 resolution with Netscape Navigator" badge and an animated dancing baby GIF.',
        icon: 'Globe',
        previewColor: 'text-yellow-400 border-yellow-500/40 bg-yellow-950/30',
        tags: ['HTML', 'Web 1.0', 'Homepages', 'GIFs']
      },
      {
        id: 'aim-chatroom',
        name: 'AIM Chatrooms & SmarterChild',
        era: 'early-internet',
        years: '1997 – 2008',
        tagline: 'Door opening sounds & dramatic Away Messages',
        whatWasIt: 'AOL Instant Messenger introduced buddy lists, chat rooms, and SmarterChild—the precursor to modern chatbots that millions of teenagers spent hours playfully roasting after school.',
        whyItMattered: 'Invented modern digital shorthand (lol, brb, afk, gtg, rofl) and made real-time peer-to-peer messaging universal.',
        theMemory: 'Writing cryptic lyric away messages in alternating caps (sOmEwHeRe i bElOnG) so your middle school crush would ask if you were okay.',
        icon: 'MessageSquare',
        previewColor: 'text-orange-400 border-orange-500/40 bg-orange-950/30',
        tags: ['Chat', 'Away Messages', 'SmarterChild', 'AIM']
      },
      {
        id: 'winamp-player',
        name: 'Winamp: It Really Whips the Llama’s Ass',
        era: 'early-internet',
        years: '1997 – 2013',
        tagline: 'The undisputed king of digital music players',
        whatWasIt: 'The ultimate customizable audio player of the early MP3 revolution, renowned for thousands of custom user-made metallic skins, equalizer visualizers, and legendary voice intro.',
        whyItMattered: 'It defined how digital music felt on personal computers before streaming, turning MP3 playback into a visual and tactile art form.',
        theMemory: 'Spending 45 minutes downloading an anime skin on 56k, only for all the buttons to become completely illegible.',
        icon: 'Music',
        previewColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30',
        tags: ['MP3', 'Skins', 'Visualizer', 'Audio']
      },
      {
        id: 'early-search-yahoo',
        name: 'Yahoo! Web Directory & Ask Jeeves',
        era: 'early-internet',
        years: '1994 – 2002',
        tagline: 'When the entire internet was hand-categorized by humans',
        whatWasIt: 'Before page-rank algorithms, Yahoo! was a literal human-curated hierarchical index of websites (e.g. Computers > Internet > Web > Humour). You also had Ask Jeeves, where an animated butler answered full-sentence questions.',
        whyItMattered: 'It made the unfathomable wilderness of the early web navigable to everyday schoolkids, researchers, and families.',
        theMemory: 'Politely typing "Dear Jeeves, where can I find cheat codes for RollerCoaster Tycoon please?"',
        icon: 'Search',
        previewColor: 'text-purple-400 border-purple-500/40 bg-purple-950/30',
        tags: ['Directory', 'Search', 'Ask Jeeves', 'Yahoo']
      }
    ]
  },
  {
    id: 'social-internet',
    title: 'THE SOCIAL INTERNET',
    subTitle: 'Everyone is Suddenly Online & Connected',
    years: '2004 – 2010',
    theme: 'MSN Nudges, Orkut Scraps, MySpace Top 8, and the Facebook Poke',
    description: 'The moment the internet transformed from a place where you looked up facts to where your entire social life existed. Your real-world friendships, teenage drama, crushes, and status updates migrated online.',
    atmosphereBg: 'from-blue-950/40 via-neutral-900 to-black',
    accentColor: 'blue',
    bannerQuote: '“If you take me out of your MySpace Top 8, we are literally not speaking on Monday.”',
    exhibits: [
      {
        id: 'msn-messenger',
        name: 'MSN Messenger & The Holy Nudge',
        era: 'social-internet',
        years: '1999 – 2013',
        tagline: 'The frantic screen shake when someone ignored your "hey"',
        whatWasIt: 'The dominant chat client for an entire global generation. Features included screen-shaking Nudges, custom animated emoticons, "Listening to:" Windows Media Player status flexes, and signing in and out 10 times to get your crush’s attention.',
        whyItMattered: 'It was the primary teenage living room of the 2000s, where after-school socialization flourished into the early morning.',
        theMemory: 'Before "seen" receipts existed, there was the agonizing silence of "User is typing..." that suddenly disappeared.',
        icon: 'MessageCircle',
        previewColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30',
        tags: ['MSN', 'Nudge', 'Emoticons', 'Winks']
      },
      {
        id: 'orkut-network',
        name: 'Orkut Scraps & 100% Cool Ratings',
        era: 'social-internet',
        years: '2004 – 2014',
        tagline: 'Public love letters, testimonials & community fanaticism',
        whatWasIt: 'Google’s legendary first major social network, immensely beloved in Brazil and India. Key features: public Scraps on your wall, testimonials that required approval, and rating friends for percentage of "Trusty", "Cool", and "Sexy".',
        whyItMattered: 'It demonstrated the immense cultural power of topic communities (e.g. "I hate waking up early", "We Hate Mathematics").',
        theMemory: 'Begging your best friend to write you an exaggerated, dramatic testimonial so everyone on your campus thought you were popular.',
        icon: 'Users',
        previewColor: 'text-pink-400 border-pink-500/40 bg-pink-950/30',
        tags: ['Orkut', 'Scraps', 'Testimonials', 'Communities']
      },
      {
        id: 'myspace-profile',
        name: 'MySpace Profile & The Top 8 Friends',
        era: 'social-internet',
        years: '2003 – 2011',
        tagline: 'Autoplaying screamo music and high-stakes social hierarchy',
        whatWasIt: 'The cultural epicenter of mid-2000s music, scene culture, and profile design. Users learned raw HTML and CSS to inject glittering backgrounds, cursor trails, and autoplaying profile songs.',
        whyItMattered: 'Taught an entire generation of kids how to code while launching global music superstars like Arctic Monkeys and Lily Allen.',
        theMemory: 'Navigating the geopolitical minefield of swapping someone from spot #4 to spot #5 in your Top 8 friends list.',
        icon: 'UserCheck',
        previewColor: 'text-sky-400 border-sky-500/40 bg-sky-950/30',
        tags: ['MySpace', 'Tom', 'Top 8', 'HTML Bling']
      },
      {
        id: 'early-facebook',
        name: 'Early Facebook: The Wall & The Poke',
        era: 'social-internet',
        years: '2004 – 2010',
        tagline: 'When Facebook was for college kids, photo albums had 60 unedited pictures, and poking was peak flirtation',
        whatWasIt: 'The clean blue college network before newsfeeds and ads. The Wall was completely public, status updates always started with your name (e.g., "[Name] is... eating a sandwich"), and poking had no defined meaning.',
        whyItMattered: 'It stripped away the chaotic glitter of MySpace in favor of a clean, real-identity directory that ended up conquering the world.',
        theMemory: 'Entering a 3-month continuous "Poke War" with someone you had never spoken a single word to in real life.',
        icon: 'Hand',
        previewColor: 'text-blue-400 border-blue-500/40 bg-blue-950/30',
        tags: ['Poke', 'The Wall', 'FarmVille', 'Status']
      },
      {
        id: 'early-youtube',
        name: 'Early YouTube 2006: Broadcast Yourself',
        era: 'social-internet',
        years: '2005 – 2011',
        tagline: '5-star ratings, yellow subscribe buttons & 240p webcam rants',
        whatWasIt: 'The golden age of amateur video before multi-million dollar studio production. Videos were shot on digital cameras, capped at 10 minutes, rated with 1 to 5 stars, and featured video response replies.',
        whyItMattered: 'Proved that regular people filming in their bedrooms (Charlie Bit My Finger, Keyboard Cat, Chocolate Rain) could outperform mainstream television.',
        theMemory: 'Waiting 15 minutes for the red buffering bar to get safely ahead of the playhead before daring to hit Play.',
        icon: 'PlaySquare',
        previewColor: 'text-red-400 border-red-500/40 bg-red-950/30',
        tags: ['YouTube', '240p', '5 Stars', 'Viral Videos']
      }
    ]
  },
  {
    id: 'aesthetic-internet',
    title: 'THE AESTHETIC INTERNET',
    subTitle: 'The Internet Gets a Personality & Fandoms',
    years: '2011 – 2015',
    theme: 'Tumblr dashboard, 6-second Vines, early Instagram square filters, and We Heart It moodboards',
    description: 'The internet matured into an artistic canvas for curation, fandoms, micro-trends, and subcultures. Identity was defined not by who you sat with at lunch, but by the Tumblr theme you spent hours debugging.',
    atmosphereBg: 'from-fuchsia-950/40 via-neutral-900 to-black',
    accentColor: 'fuchsia',
    bannerQuote: '“Look at all those chickens! 🐔” — An eternal 6-second masterpiece',
    exhibits: [
      {
        id: 'tumblr-dashboard',
        name: 'Tumblr Dashboard & Aesthetic Fandoms',
        era: 'aesthetic-internet',
        years: '2010 – 2016',
        tagline: 'Monochrome quotes, SuperWhoLock, and infinite text reblogs',
        whatWasIt: 'A microblogging haven powered by reblogs, curated tags, aesthetic photography, gifsets with subtitles, and fervent fandom discourse.',
        whyItMattered: 'It shaped internet humor, visual aesthetics, fandom culture, and modern meme syntax for a decade.',
        theMemory: 'Reblogging a high-contrast photo of rainy neon city streets with the caption "my soul at 3:00 AM".',
        icon: 'Layers',
        previewColor: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/30',
        tags: ['Tumblr', 'Reblog', 'Fandoms', 'GIF sets']
      },
      {
        id: 'vine-loop',
        name: 'Vine: 6-Second Chaotic Comedy',
        era: 'aesthetic-internet',
        years: '2013 – 2017',
        tagline: 'Perfection achieved in 6 looping seconds',
        whatWasIt: 'Twitter’s short-form video platform that restricted every video to exactly 6 looping seconds. It forced creators into lightning-fast comedic timing, surreal absurdist skits, and iconic catchphrases.',
        whyItMattered: 'The undisputed spiritual ancestor of modern short-form video, where every single second was crafted with masterclass economy.',
        theMemory: 'Quoting "Two bros chillin in a hot tub five feet apart cuz they’re not gay" in everyday conversation.',
        icon: 'Video',
        previewColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30',
        tags: ['Vine', '6 Seconds', 'Loop', 'Catchphrases']
      },
      {
        id: 'early-instagram',
        name: 'Early Instagram 2012: The Square Filter Era',
        era: 'aesthetic-internet',
        years: '2010 – 2015',
        tagline: 'Heavy vignette, Nashville filter, white borders, and pictures of latte foam',
        whatWasIt: 'When Instagram was purely a mobile photography app with a skeuomorphic brown leather camera logo. Every photo had to be a 1:1 square, slapped with heavy Earlybird or Toaster filters and fake tilt-shift blur.',
        whyItMattered: 'It made casual mobile phone photography feel vintage, artsy, and instantly nostalgic.',
        theMemory: 'Taking a picture of your sneakers on pavement and applying 100% Lo-Fi filter with the caption "Walk your path #deep".',
        icon: 'Camera',
        previewColor: 'text-amber-400 border-amber-500/40 bg-amber-950/30',
        tags: ['Instagram', 'Filters', 'Square Crop', 'Skeuomorphism']
      },
      {
        id: 'weheartit-pinterest',
        name: 'We Heart It & The Pastel Moodboard Wall',
        era: 'aesthetic-internet',
        years: '2011 – 2016',
        tagline: 'Fairy lights, pastel polaroids, and soft grunge dreams',
        whatWasIt: 'Visual bookmarking platforms where millions curated dreamy collections of soft pastel photography, vinyl records, oversized sweaters, and inspirational quote cards.',
        whyItMattered: 'Established the "moodboard" as a primary medium for digital daydreaming and lifestyle aspiration.',
        theMemory: 'Spending a Sunday afternoon saving 300 pictures of Paris in autumn while sitting in your suburban bedroom.',
        icon: 'Heart',
        previewColor: 'text-rose-400 border-rose-500/40 bg-rose-950/30',
        tags: ['Aesthetic', 'Moodboard', 'Soft Grunge', 'Quotes']
      }
    ]
  },
  {
    id: 'algorithm-era',
    title: 'THE ALGORITHM ERA',
    subTitle: 'The Algorithm Takes Over & Chooses For You',
    years: '2016 – 2020',
    theme: 'Personalized feeds, Stories, TikTok emergence, and hyper-targeted recommendations',
    description: 'The fundamental shift of the internet: you no longer search for what you want to see—the mathematical recommendation engine predicts what will hold your dopamine receptors captive.',
    atmosphereBg: 'from-violet-950/40 via-neutral-900 to-black',
    accentColor: 'violet',
    bannerQuote: '“You don’t choose what you see anymore. The algorithm chooses you.”',
    exhibits: [
      {
        id: 'algorithm-simulator',
        name: 'The Algorithmic Echo Chamber Engine',
        era: 'algorithm-era',
        years: '2016 – Present',
        tagline: 'How 3 clicks put you in a personalized filter bubble',
        whatWasIt: 'The machine learning recommender systems that replaced reverse-chronological feeds with predictive engagement scores, measuring watch duration down to milliseconds.',
        whyItMattered: 'Transformed the global information ecosystem, creating individualized reality tunnels tailored to keep every user hooked.',
        theMemory: 'Wondering if your phone was listening to you because you mentioned "camping tents" once and saw 40 ads for outdoor gear ten minutes later.',
        icon: 'Cpu',
        previewColor: 'text-purple-400 border-purple-500/40 bg-purple-950/30',
        tags: ['Algorithm', 'Filter Bubble', 'Engagement', 'AI']
      },
      {
        id: 'snapchat-stories',
        name: 'Snapchat Streaks & Ephemeral Stories',
        era: 'algorithm-era',
        years: '2014 – 2019',
        tagline: 'Dog ears filter and the fear of losing a 400-day streak',
        whatWasIt: 'The invention of 24-hour disappearing content and vertical full-screen camera communication, featuring puppy face filters and high-stakes fire streaks.',
        whyItMattered: 'Freed users from the permanent anxiety of curated feeds by making content temporary, a format copied by every other social network.',
        theMemory: 'Frantically sending a black screen with "S" written on it at 11:58 PM to save your 512-day streak with your cousin.',
        icon: 'Zap',
        previewColor: 'text-yellow-300 border-yellow-400/40 bg-yellow-950/30',
        tags: ['Snapchat', 'Streaks', 'Stories', 'Lenses']
      }
    ]
  },
  {
    id: 'modern-internet',
    title: 'THE INTERNET TODAY',
    subTitle: 'The Internet Never Sleeps: Attention Economy & AI',
    years: '2021 – PRESENT',
    theme: 'Infinite doomscroll, notification storm, hyper-stimulation, and generative AI',
    description: 'A 24/7 hyper-accelerated digital landscape where millions of notifications, AI-generated content, brainrot memes, and live streams compete for every second of human cognitive attention.',
    atmosphereBg: 'from-rose-950/40 via-neutral-900 to-black',
    accentColor: 'rose',
    bannerQuote: '“Just 5 more minutes before bed...” *3 hours later*',
    exhibits: [
      {
        id: 'doomscroll-feed',
        name: 'The Infinite Doomscroll & Notification Barrage',
        era: 'modern-internet',
        years: '2021 – Present',
        tagline: 'The bottomless ocean of micro-dopamine hits',
        whatWasIt: 'The frictionless UX design pattern where scrolling has no ending barrier, paired with aggressive push notification hooks designed to pull you back in.',
        whyItMattered: 'Represented the pinnacle of the attention economy, turning screen time into the world’s most contested real estate.',
        theMemory: 'Opening your phone to check the weather, getting lost in 45 short videos about antique rug restoration, and forgetting why you unlocked your phone.',
        icon: 'Smartphone',
        previewColor: 'text-red-400 border-red-500/40 bg-red-950/30',
        tags: ['Doomscroll', 'Notifications', 'Attention Economy', 'Mobile']
      },
      {
        id: 'ai-hallucination',
        name: 'Synthetic Internet & AI Content Engines',
        era: 'modern-internet',
        years: '2023 – Present',
        tagline: 'When the internet starts generating itself',
        whatWasIt: 'Generative AI models producing text, art, voices, and deepfakes at superhuman velocity, blurring the distinction between authentic human culture and machine synthesis.',
        whyItMattered: 'Marks the transition of the web from a human-created library into an autonomous, self-generating digital ecosystem.',
        theMemory: 'Staring at a photo of an 8-legged peacock wearing a tuxedo and having to double-check if it’s real or AI generated.',
        icon: 'Sparkles',
        previewColor: 'text-teal-400 border-teal-500/40 bg-teal-950/30',
        tags: ['AI', 'Generative', 'Deepfake', 'Future']
      }
    ]
  },
  {
    id: 'cyber-cafe',
    title: 'THE CYBER CAFÉ WING',
    subTitle: 'The Shared Sanctuary of the 2000s',
    years: '1998 – 2008',
    theme: 'Hourly cabin tokens, Songs.pk downloads, Counter-Strike LAN parties, and Yahoo! webcam booths',
    description: 'A special memorial wing dedicated to how millions around the world (especially in India, Latin America, and Southeast Asia) first touched the internet: walking into a cramped cyber café with neon cubicles, greasy trackball mice, and 1-hour computer passes.',
    atmosphereBg: 'from-emerald-950/40 via-neutral-900 to-black',
    accentColor: 'emerald',
    bannerQuote: '“Bhaiya, please add 30 more minutes to Cabin 4!”',
    exhibits: [
      {
        id: 'cyber-cafe-cabin',
        name: 'Cabin 4: The 1-Hour Internet Token',
        era: 'cyber-cafe',
        years: '2000 – 2010',
        tagline: '₹20 an hour, curtained cubicle, and high-speed dreams',
        whatWasIt: 'The shared community internet shop where a timer software counted down your minutes on screen. You printed project assignments, made Orkut accounts, and chatted on Yahoo! Messenger.',
        whyItMattered: 'The true egalitarian bridge that connected millions of first-generation internet users before cheap home broadband or smartphones existed.',
        theMemory: 'Panicking with 45 seconds left on your token while trying to copy 12 downloaded Bollywood songs onto a 128MB pen drive.',
        icon: 'Coffee',
        previewColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30',
        tags: ['Cyber Café', 'LAN', 'Cabin', 'Pen Drive', 'Yahoo']
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'How did you communicate with friends after school?',
    scenario: 'It is 4:30 PM on a Tuesday. Your homework is on the table.',
    options: [
      {
        text: 'Dialing up the modem, waiting for the screech, then opening AIM or an IRC chatroom.',
        subtext: 'Praying no one picked up the telephone downstairs.',
        generation: 'digital-pioneer',
        icon: 'Radio'
      },
      {
        text: 'Signing onto MSN Messenger, sending a Nudge, and checking their Orkut scraps.',
        subtext: 'Putting your crush in your Top 8 and sharing YouTube links.',
        generation: 'social-native',
        icon: 'MessageCircle'
      },
      {
        text: 'Scrolling Tumblr dashboard, reblogging aesthetic gifsets, and quoting 6-second Vines.',
        subtext: 'Customizing HTML themes with fairy lights and sad quotes.',
        generation: 'tumblr-gen',
        icon: 'Heart'
      },
      {
        text: 'Sending Snapchat streaks, scrolling infinite algorithmic feeds, or watching TikTok clips.',
        subtext: 'The algorithm already knew what I wanted before I asked.',
        generation: 'algorithm-native',
        icon: 'Zap'
      }
    ]
  },
  {
    id: 2,
    question: 'How did you get digital music onto your computer/device?',
    scenario: 'You want to hear the latest hit song right now.',
    options: [
      {
        text: 'Waiting 35 minutes for a single 128kbps MP3 on Napster/Kazaa, playing it on Winamp.',
        subtext: 'Filename: linkin_park_numb_real_no_virus.mp3.exe',
        generation: 'digital-pioneer',
        icon: 'Music'
      },
      {
        text: 'Using YouTube-to-MP3 converters or copying songs at the local Cyber Café onto a USB drive.',
        subtext: 'Listening on a colored iPod Nano with clickwheel.',
        generation: 'social-native',
        icon: 'Disc'
      },
      {
        text: 'Listening to 8tracks playlists, indie Soundcloud leaks, or customized Tumblr music players.',
        subtext: 'Chasing obscure remix aesthetics with vintage album art.',
        generation: 'tumblr-gen',
        icon: 'Headphones'
      },
      {
        text: 'Instant 1-tap streaming on Spotify or hearing 15-second sped-up viral sounds on TikTok.',
        subtext: 'Algorithmic personalized discover weekly playlists.',
        generation: 'algorithm-native',
        icon: 'Sparkles'
      }
    ]
  },
  {
    id: 3,
    question: 'What did a social media "status" mean to you?',
    scenario: 'You want to express your emotional state to the world.',
    options: [
      {
        text: 'Writing an AIM Away message like "out getting pizza... leave one ~*~"',
        subtext: 'Displayed in Courier New with bright yellow text on blue background.',
        generation: 'digital-pioneer',
        icon: 'MessageSquare'
      },
      {
        text: 'Changing your MSN status to a cryptic lyric or changing Facebook status to "is complicated".',
        subtext: 'Enabling "Show what I\'m listening to" to flex good music taste.',
        generation: 'social-native',
        icon: 'Smile'
      },
      {
        text: 'Reblogging a high-contrast black-and-white photo with tags like #relatable #thoughts #2am.',
        subtext: 'Text posts with 40,000 notes discussing deep feelings.',
        generation: 'tumblr-gen',
        icon: 'Layers'
      },
      {
        text: 'Posting a 24-hour Story with a quick song sticker or sending a 1-second video snap.',
        subtext: 'Ephemeral, effortless, disappears tomorrow.',
        generation: 'algorithm-native',
        icon: 'Camera'
      }
    ]
  },
  {
    id: 4,
    question: 'What was your primary internet hazard / fear?',
    scenario: 'Something has gone terribly wrong on the computer.',
    options: [
      {
        text: 'Accidentally pressing the internet button on a flip phone and losing all prepaid balance.',
        subtext: 'Or hearing your dad yell that the phone line is busy.',
        generation: 'digital-pioneer',
        icon: 'AlertTriangle'
      },
      {
        text: 'Getting poked by someone weird or someone deleting you from their MySpace Top 8.',
        subtext: 'Or downloading a LimeWire file that broke Windows XP.',
        generation: 'social-native',
        icon: 'ShieldAlert'
      },
      {
        text: 'Your mom finding your secret aesthetic Tumblr blog where you vented about your life.',
        subtext: 'Or Vine shutting down forever.',
        generation: 'tumblr-gen',
        icon: 'Lock'
      },
      {
        text: 'Accidentally liking a 5-year-old photo while deep-stalking someone at 2:00 AM.',
        subtext: 'Or losing an 800-day Snapchat streak due to no Wi-Fi.',
        generation: 'algorithm-native',
        icon: 'Eye'
      }
    ]
  },
  {
    id: 5,
    question: 'How do you discover new things on the web?',
    scenario: 'You are bored and want to be entertained.',
    options: [
      {
        text: 'Clicking through webrings, bookmarks, Yahoo directory folders, or Ask Jeeves.',
        subtext: 'Pure organic serendipity and personal homepages.',
        generation: 'digital-pioneer',
        icon: 'Compass'
      },
      {
        text: 'What my friends posted on their wall, forwarded in emails, or shared on Orkut & MSN.',
        subtext: 'Word of mouth and peer recommendations.',
        generation: 'social-native',
        icon: 'Share2'
      },
      {
        text: 'Following niche aesthetic blogs, exploring tag trackers, and watching Vine compilations.',
        subtext: 'Curated taste communities and fandom tags.',
        generation: 'tumblr-gen',
        icon: 'Grid'
      },
      {
        text: 'I do not search for content. The algorithm knows my subconscious and feeds me.',
        subtext: 'Infinite feed calibrated to microsecond retention.',
        generation: 'algorithm-native',
        icon: 'Cpu'
      }
    ]
  }
];

export const GENERATION_RESULTS: Record<string, GenerationResult> = {
  'digital-pioneer': {
    id: 'digital-pioneer',
    title: 'THE DIGITAL PIONEER',
    eraRange: '1995 – 2003 Era',
    quote: '“You remember when being online was an intentional activity, not a permanent state of existence.”',
    archetype: 'The Dial-Up Explorer',
    traits: [
      'Knows the exact pitch of a 56k modem handshake',
      'Remembers when you had to ask permission to use the internet',
      'Built a GeoCities site with Comic Sans & flaming fire GIF headers',
      'Survives on pure patience and IRC away messages'
    ],
    signatureMemory: 'Watching an image load line-by-line over 45 seconds while praying no one answered the landline.',
    techStack: ['CRT Monitor', 'Winamp Skins', 'Netscape Navigator', 'Floppy Disks', 'AIM'],
    badgeColor: 'from-amber-600 to-yellow-500'
  },
  'social-native': {
    id: 'social-native',
    title: 'THE SOCIAL NETWORK NATIVE',
    eraRange: '2004 – 2010 Era',
    quote: '“You survived MSN nudges, Orkut scraps, embarrassing Facebook albums, and high-stakes MySpace Top 8 drama.”',
    archetype: 'The Social Web Architect',
    traits: [
      'Mastered the art of signing in/out of MSN to get your crush’s attention',
      'Learned basic HTML just to make your MySpace profile glitter',
      'Maintained a 100% Cool rating on Orkut and wrote heartfelt testimonials',
      'Remembers when YouTube videos were 240p with 5-star ratings'
    ],
    signatureMemory: 'Agonizing over who deserved the #1 spot on your MySpace Top 8 without causing a cafeteria fight.',
    techStack: ['MSN Messenger', 'Orkut', 'MySpace', 'Early Facebook', 'LimeWire', 'Sony Cyber-shot'],
    badgeColor: 'from-blue-600 to-cyan-500'
  },
  'tumblr-gen': {
    id: 'tumblr-gen',
    title: 'THE TUMBLR GENERATION',
    eraRange: '2011 – 2015 Era',
    quote: '“Your entire teenage personality was represented by high-contrast quotes, aesthetic gifsets, and 6-second Vines.”',
    archetype: 'The Aesthetic Curator',
    traits: [
      'Can recite at least 25 iconic Vines verbatim from memory',
      'Spent hours curating pastel moodboards and soft grunge themes',
      'Remembers when Instagram had skeuomorphic camera logos and square crops',
      'Understands the sacred etiquette of the Tumblr reblog chain'
    ],
    signatureMemory: 'Spending 3 hours fixing a broken custom HTML Tumblr theme with falling snowflake cursor effects.',
    techStack: ['Tumblr', 'Vine', 'Early Instagram', 'We Heart It', '8tracks', 'VSCO Cam'],
    badgeColor: 'from-fuchsia-600 to-pink-500'
  },
  'algorithm-native': {
    id: 'algorithm-native',
    title: 'THE ALGORITHM NATIVE',
    eraRange: '2016 – Present Era',
    quote: '“You don’t search for content. The algorithm understands your subconscious and delivers it in 15-second bursts.”',
    archetype: 'The Hyper-Feed Navigator',
    traits: [
      'Has an instinctively tuned algorithm that predicts your exact micro-interests',
      'Can process 4 different pieces of media simultaneously',
      'Maintains 500+ day streaks and communicates via vertical stories',
      'Lives at the frontier of generative AI memes and synthetic culture'
    ],
    signatureMemory: 'Opening your phone to set a 7:00 AM alarm and realizing it is already 3:30 AM in a TikTok rabbit hole.',
    techStack: ['TikTok', 'Snapchat Streaks', 'Generative AI', 'Spotify Wrapped', 'Dark Mode'],
    badgeColor: 'from-rose-600 to-purple-500'
  }
};

export const INITIAL_COMMUNITY_MEMORIES: CommunityMemory[] = [
  {
    id: 'mem-1',
    author: 'CyberNostalgia99',
    era: '90s',
    text: 'I miss the absolute mystery of the early web. Finding a weird website created by someone across the planet felt like discovering an uncharted island.',
    likes: 142,
    location: 'Seattle, WA',
    timestamp: '2 hours ago'
  },
  {
    id: 'mem-2',
    author: 'OrkutKing_2006',
    era: '00s',
    text: 'Orkut scraps and testimonials! People wrote long poetic essays praising their best friends. Privacy was non-existent and everyone read everyone else’s wall.',
    likes: 219,
    location: 'Mumbai, India',
    timestamp: '4 hours ago'
  },
  {
    id: 'mem-3',
    author: 'VineVeteran',
    era: '10s',
    text: 'Vine was lightning in a bottle. 6 seconds forced pure comedic genius with zero fluff. Every single millisecond was maximized.',
    likes: 384,
    location: 'London, UK',
    timestamp: '1 day ago'
  },
  {
    id: 'mem-4',
    author: 'MSN_Nudge_Fanatic',
    era: '00s',
    text: 'Setting your MSN status to a song title with Windows Media Player plugin so your crush knew you had deep taste in alternative rock.',
    likes: 491,
    location: 'Toronto, CA',
    timestamp: '2 days ago'
  },
  {
    id: 'mem-5',
    author: 'DialupSurvivor',
    era: '90s',
    text: 'The pure adrenaline rush when the dial-up connection finally succeeded at 2:00 AM without waking up the entire household.',
    likes: 165,
    location: 'Melbourne, AU',
    timestamp: '3 days ago'
  }
];

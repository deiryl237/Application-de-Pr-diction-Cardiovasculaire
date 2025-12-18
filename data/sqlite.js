import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('heartCare.db');

const SEED_ARTICLES = [
  {
    "id": 1,
    "title": "Hypertension artérielle",
    "resume": "L'hypertension artérielle est fréquente et souvent indolore, mais cause majeure de mortalité. Elle peut être prévenue par un mode de vie sain (alimentation peu salée, poids normal, exercice, arrêt du tabac).",
    "categories": "hypertension",
    "readTime": "6 min",
    "content": "La prévention de l'hypertension passe par l'hygiène de vie : limiter le sel (<5 g/j), maintenir un poids normal, faire de l'exercice régulier (150 min/semaine) et ne pas fumer. Ces changements de mode de vie aident à abaisser la tension artérielle et à réduire le risque de complications cardiovasculaires.",
    "author": "OMS",
    "published_at": "25 septembre 2025",
    "source": "https://www.who.int/fr/news-room/fact-sheets/detail/hypertension"
  },
  {
    "id": 2,
    "title": "10 conseils pour prévenir l'hypertension",
    "resume": "Adopter un mode de vie sain est crucial pour prévenir l'hypertension artérielle. Cet article liste 10 conseils pratiques : réduire le sel, avoir une alimentation équilibrée, augmenter l'apport en potassium (fruits, légumes), ne pas fumer, faire de l'exercice, modérer l'alcool, maintenir un poids normal, gérer le stress et surveiller régulièrement sa tension.",
    "categories": "hypertension",
    "readTime": "5 min",
    "content": "Pour prévenir l'hypertension, il faut adopter des habitudes de vie saines. En pratique : limiter la consommation de sel, préférer une alimentation riche en fruits et légumes (riche en potassium), faire au moins 30 min d'exercice modéré par jour, arrêter de fumer, modérer l'alcool et maintenir un poids de santé. Contrôler sa tension régulièrement et gérer le stress complètent ces mesures.",
    "author": "David Bême",
    "published_at": "05/06/2019",
    "source": "https://www.doctissimo.fr/html/dossiers/hypertension_arterielle/10222-hypertension-facteur-regles.htm"
  },
  {
    "id": 3,
    "title": "Diabète",
    "resume": "Le diabète de type 2 peut être prévenu par un mode de vie sain. Maintenir un poids normal, pratiquer une activité physique régulière, manger équilibré (faible en sucres et graisses saturées) et ne pas fumer réduisent fortement le risque de développement du diabète.",
    "categories": "diabete",
    "readTime": "6 min",
    "content": "La prévention du diabète de type 2 repose sur l'hygiène de vie : garder un poids de santé, faire au moins 150 min d'activité physique par semaine (marche, natation, etc.), et suivre une alimentation équilibrée, pauvre en sucres ajoutés et en graisses saturées. Ces mesures retardent et préviennent l'apparition du diabète et de ses complications.",
    "author": "OMS",
    "published_at": "14 novembre 2024",
    "source": "https://www.who.int/fr/news-room/fact-sheets/detail/diabetes"
  },
  {
    "id": 4,
    "title": "Diabète de type 2 § Diabète Québec",
    "resume": "Selon Diabète Québec, des changements du mode de vie peuvent réduire de 60 % le risque de diabète de type 2. L'article souligne l'importance de perdre du poids, de pratiquer régulièrement de l'exercice (150 min/semaine) et d'avoir une alimentation saine (riche en fibres, légère en gras/sucres) pour prévenir ce diabète.",
    "categories": "diabete",
    "readTime": "5 min",
    "content": "La prévention du diabète de type 2 repose sur l'hygiène de vie : perdre du poids et bouger régulièrement (au moins 150 min par semaine) réduit significativement le risque. Un mode de vie sain (alimentation équilibrée riche en légumes, légumineuses, graisses saines et faible en sucres ajoutés) peut retarder l'apparition du diabète et de ses complications.",
    "author": "Diabète Québec",
    "published_at": "07/2022",
    "source": "https://diabete.qc.ca/fr/diabete/comprendre-le-diabete/diabete-de-type-2"
  },
  {
    "id": 5,
    "title": "Lutter contre l'excès de poids § Ameli",
    "resume": "Un suivi régulier de l'IMC dès l'enfance et une hygiène de vie saine sont essentiels pour prévenir le surpoids. Cet article rappelle l'importance d'une alimentation équilibrée et de l'activité physique quotidienne tout au long de la vie pour éviter l'obésité.",
    "categories": "obesite",
    "readTime": "4 min",
    "content": "La prévention de l'obésité commence dès l'enfance par l'éducation et le suivi du poids. Adopter une alimentation variée et équilibrée (fruits, légumes, céréales complètes) et pratiquer chaque jour au moins 60 min d'activité physique sont recommandés. Il faut également limiter le temps d'écran et valoriser le sport ou les jeux actifs pour maintenir un poids sain.",
    "author": "Assurance Maladie",
    "published_at": "25 novembre 2025",
    "source": "https://www.ameli.fr/assure/prevention/surpoids-obesite/prevention"
  },
  {
    "id": 6,
    "title": "Prévenir l'obésité par l'activité quotidienne",
    "resume": "Cet article propose des micro-habitudes pour intégrer de l'activité physique dans la journée et ainsi prévenir l'obésité. Par exemple, marcher 30 minutes par jour (même en trois fois 10 min), prendre les escaliers et bouger en effectuant les tâches ménagères. Ces gestes simples aident à brûler des calories et à maintenir un poids sain.",
    "categories": "obesite",
    "readTime": "3 min",
    "content": "La prévention de l'obésité passe par l'intégration d'activités physiques simples au quotidien : marcher 30 min par jour (même en 3x10 min), privilégier les escaliers et bouger pendant les tâches ménagères. Ces micro-habitudes permettent de brûler plus de calories chaque jour et de limiter progressivement la prise de poids.",
    "author": "Continental Hospitals (blog)",
    "published_at": "21/08/2025",
    "source": "https://continentalhospitals.com/fr/blog/activites-quotidiennes-eviter-obesite"
  },
  {
    "id": 7,
    "title": "Bouger au bureau : 10 astuces contre la sédentarité",
    "resume": "La sédentarité au travail augmente le risque de surpoids, diabète et maladies cardiovasculaires. L'article propose 10 astuces pour bouger plus au bureau : alterner positions (assis/debout), faire des pauses actives (marcher, s'étirer) régulièrement, et pratiquer 30 min d'activité physique par jour (gym, marche) en dehors du travail.",
    "categories": "sedentarite",
    "readTime": "5 min",
    "content": "Pour prévenir la sédentarité, l'article recommande de bouger plus au quotidien, surtout au travail. Par exemple, alterner la position assise/debout, faire des pauses actives toutes les 30 min (marcher, étirer les jambes) et commencer sa journée par un peu de marche. Vis-à-vis de la journée, pratiquer au total au moins 30 min d'activité physique chaque jour (comme la marche rapide) pour compenser les positions prolongées.",
    "author": "Santé Sur le Net",
    "published_at": "25/08/2025",
    "source": "https://www.santesurlenet.com/sante-au-quotidien/equilibre-vie-properso/bouger-bureau"
  },
  {
    "id": 8,
    "title": "Trop peu d'activité physique en France",
    "resume": "Cet article rapporte que 25 % des Français sont en danger par manque d'activité physique. Il rappelle les recommandations de l'OMS : au moins 150 min d'activité modérée par semaine (ou 75 min intense) pour rester en bonne santé. Chaque geste compte : marcher plus et réduire le temps assis.",
    "categories": "sedentarite",
    "readTime": "3 min",
    "content": "La prévention du manque d'activité passe par la pratique quotidienne d'activité physique. L'article souligne que l'OMS recommande au moins 150 min d'activité modérée par semaine pour limiter le risque de maladies cardiovasculaires et de diabète. Des gestes simples comme marcher davantage ou prendre les escaliers à pied chaque jour peuvent aider à atteindre cet objectif.",
    "author": "ConsoGlobe",
    "published_at": "06/09/2018",
    "source": "https://www.conso-globe.com/une-personne-sur-quatre-danger-par-inactivite-physique-ar19-25004"
  },
  {
    "id": 9,
    "title": "Cholestérol : l'importance de la prévention",
    "resume": "Cet article de Doctissimo explique que le meilleur traitement du cholestérol est la prévention. Il recommande 30 min d'exercice modéré (marche rapide, natation) plusieurs fois par semaine et une alimentation équilibrée riche en fruits, légumes et huiles végétales, pauvre en graisses saturées. Le dépistage régulier aide à agir tôt.",
    "categories": "cholesterol",
    "readTime": "5 min",
    "content": "La prévention du cholestérol passe par l'hygiène de vie : pratiquer au moins 30 min d'exercice (marche, natation) 3 fois par semaine et une alimentation équilibrée. En particulier, limiter les graisses saturées (viandes grasses, beurre) et favoriser fruits, légumes, huiles végétales. Le contrôle du taux sanguin permet d'intervenir tôt en cas d'excès.",
    "author": "Dr Anne-Aurélie Epis de Fleurian",
    "published_at": "30/06/2017",
    "source": "https://www.doctissimo.fr/html/dossiers/dossiers_sante/diabete/dossiers/sa_prevenir_cholesterol.htm"
  },
  {
    "id": 10,
    "title": "9 exercices pour prévenir le cholestérol",
    "resume": "Top Santé préconise 9 exercices physiques sans matériel (pompes, squats, fentes...) pour maintenir une bonne santé cardiovasculaire. Il rappelle que l'activité physique contribue à réduire le mauvais cholestérol et la tension artérielle, tandis qu'une alimentation pauvre en graisses saturées (charcuteries, fritures) et riche en fibres (céréales complètes) est conseillée.",
    "categories": "cholesterol",
    "readTime": "4 min",
    "content": "La prévention du cholestérol passe par l'activité physique et une alimentation saine. Par exemple, faire régulièrement des pompes, squats et fentes aide à baisser le LDL-cholestérol. Il faut également limiter les graisses saturées (charcuterie, fromages gras) et préférer les aliments riches en fibres (céréales complètes, fruits) pour maintenir des taux de cholestérol sains.",
    "author": "Top Santé",
    "published_at": "19/12/2024",
    "source": "https://www.topsante.com/famille/education-de-l-enfant/conseil-pratique/9-exercices-pour-pr%C3%A9venir-le-cholest%C3%A9rol-627588"
  },
  {
    "id": 11,
    "title": "Alimentation de l'adulte : bien manger pour être en forme",
    "resume": "Manger varié (5 fruits-légumes par jour, légumineuses, légumes secs) et limiter les aliments gras ou sucrés prévient de nombreuses maladies. Ce site ministériel rappelle que bien s'alimenter et bouger prévient le surpoids, le diabète et améliore la santé globale, surtout combiné à de l'exercice.",
    "categories": "alimentaire",
    "readTime": "3 min",
    "content": "La prévention de nombreuses maladies repose sur une alimentation variée : manger 5 fruits et légumes par jour, privilégier les céréales complètes (légumineuses, légumes secs) et limiter les aliments riches en graisses saturées ou en sucres ajoutés. Cette hygiène alimentaire, combinée à une activité physique régulière, renforce la santé et la longévité.",
    "author": "Ameli",
    "published_at": "13 mai 2025",
    "source": "https://www.ameli.fr/assure/conseils-sante/vie-saine-activite-physique/alimentation-alimentation-saine"
  },
  {
    "id": 12,
    "title": "Comment réduire son risque cardiovasculaire ?",
    "resume": "Pour prévenir les maladies cardiovasculaires, ce site officiel rappelle l'importance de l'activité physique régulière (30 min par jour) et d'une bonne hygiène alimentaire (fruits, légumes, huile d'olive, peu de sucres/gras). Maintenir un poids normal et respecter le traitement médical complètent ces mesures pour baisser le risque d'infarctus ou d'AVC.",
    "categories": "cardiovasculaire",
    "readTime": "4 min",
    "content": "Prévenir les maladies cardiovasculaires passe par l'hygiène de vie : manger équilibré (fruits, légumes, huiles végétales ; limiter sucres et graisses saturées), pratiquer une activité physique régulière (30 min par jour) et maintenir un poids normal. Ces mesures associées au traitement des facteurs (hypertension, diabète, tabac) réduisent nettement le risque d'infarctus et d'AVC.",
    "author": "Ameli",
    "published_at": "13 mars 2025",
    "source": "https://www.ameli.fr/assure/sante/themes/isere/cardiovasculaire-reduction-risque"
  },
  {
    "id": 13,
    "title": "Activité physique recommandée",
    "resume": "L'OMS recommande d'intégrer chaque jour au moins 30 minutes d'activité physique modérée (marche rapide, gym douce) ou 150 min par semaine au total. Cette activité quotidienne (marche, jardinage, etc.) aide à lutter contre la sédentarité et à rester en forme pour prévenir surpoids, diabète et troubles métaboliques.",
    "categories": "sedentarite",
    "readTime": "4 min",
    "content": "Pour prévenir la sédentarité, il faut bouger tous les jours. L'OMS recommande au moins 150 min d'activité modérée par semaine pour rester en bonne santé. Dans la vie quotidienne, cela signifie marcher pour les déplacements, prendre les escaliers, et faire des pauses dynamiques. Cet objectif évite les risques de surpoids, diabète et maladies cardiovasculaires liés à l'inactivité.",
    "author": "Ameli",
    "published_at": "25 juillet 2024",
    "source": "https://www.ameli.fr/assure/prevention/sedentarite/fiches"
  },
  {
    "id": 14,
    "title": "Maladies cardiovasculaires",
    "resume": "Les maladies cardiovasculaires peuvent être largement prévenues en agissant sur les facteurs de risque modifiables. L'OMS rappelle qu'arrêter de fumer, limiter le sel, le sucre et les graisses saturées, diminuer l'alcool et bouger (150 min/semaine) sont des mesures clés pour réduire le risque d'infarctus et d'AVC.",
    "categories": "hypertension",
    "readTime": "6 min",
    "content": "La prévention des maladies cardiovasculaires repose sur la gestion des facteurs modifiables : arrêter le tabac, réduire le sel, les sucres libres et les graisses saturées (charcuteries, produits transformés), limiter l'alcool, consommer plus de fruits et légumes, et pratiquer 150 min d'exercice hebdomadaire. Ces mesures associées diminuent fortement le risque d'infarctus du myocarde et d'AVC.",
    "author": "OMS",
    "published_at": "31 juillet 2025",
    "source": "https://www.who.int/fr/news-room/fact-sheets/detail/cardiovascular-diseases"
  },
  {
    "id": 15,
    "title": "Tabac",
    "resume": "Le tabagisme provoque 8 millions de morts par an. L'OMS souligne qu'une prévention efficace combine des lois (interdiction publicité, taxes) et de l'aide aux fumeurs. Pour les individus, il faut chercher du soutien (substituts nicotiniques, conseils) pour arrêter de fumer et ainsi sauver sa santé et protéger les autres de la fumée passive.",
    "categories": "tabagisme",
    "readTime": "5 min",
    "content": "La prévention du tabagisme s'appuie sur des politiques publiques et du soutien aux fumeurs. Augmenter les taxes sur le tabac, interdire sa publicité, ainsi qu'offrir des programmes d'accompagnement (counseling, substituts nicotiniques) encouragent l'arrêt du tabac. Chaque fumeur évité contribue à sauver des vies en préservant la santé de tous.",
    "author": "OMS",
    "published_at": "18 novembre 2023",
    "source": "https://www.who.int/fr/news-room/fact-sheets/detail/tobacco"
  },
  {
    "id": 16,
    "title": "Comment prévenir l'obésité",
    "resume": "Pour prévenir l'obésité, cet article recommande une approche globale : adopter une alimentation variée et équilibrée (fruits, légumes, céréales complètes, limiter sucres et graisses saturées), cumuler 150 min d'activité physique modérée par semaine (marche rapide, vélo), et dormir suffisamment (environ 7 h). Gérer son stress contribue également à contrôler le poids.",
    "categories": "obesite",
    "readTime": "6 min",
    "content": "La prévention de l'obésité repose sur plusieurs habitudes saines : une alimentation équilibrée (variée, riche en fruits, légumes, céréales complètes et pauvre en sucre et gras saturés), au moins 150 min d'activité physique modérée par semaine (marche rapide, vélo), ainsi qu'un sommeil suffisant (environ 7 h). L'ensemble de ces mesures minimise la prise de poids et le risque de maladies associées.",
    "author": "FDPM",
    "published_at": "07/03/2023",
    "source": "https://fdpm.fr/index.php/actus/actu-sante/comment-prevenir-lobesite"
  },
  {
    "id": 17,
    "title": "Bouger plus pour être en bonne santé : recommandations OMS",
    "resume": "L'OMS recommande aujourd'hui aux adultes de pratiquer 150 à 300 min d'activité modérée par semaine (ou 75 à 150 min d'intense) pour une santé optimale. Bouger régulièrement (marche, escalier, danse) permettrait d'éviter jusqu'à 5 millions de décès annuels, prévenant notamment les maladies cardiovasculaires et le diabète.",
    "categories": "sedentarite",
    "readTime": "4 min",
    "content": "La prévention de l'inactivité passe par des gestes simples au quotidien. L'OMS recommande 150 à 300 min d'activité modérée par semaine pour les adultes. Des activités comme la marche rapide, le vélo ou les tâches ménagères sont encouragées. Bouger chaque jour réduit fortement le risque de maladies cardiovasculaires et de diabète de type 2.",
    "author": "EGYM Wellpass",
    "published_at": "18 juin 2025",
    "source": "https://fr.egym-wellpass.com/fr-fr/blog/bien-etre-au-travail/bouger-plus-bonne-sante-recommandations-oms"
  },
  {
    "id": 18,
    "title": "Activité physique",
    "resume": "L'OMS définit l'activité physique comme tout mouvement musculaire dépensant de l'énergie (sport, marche, travaux domestiques, etc.). Elle affirme qu'« toute activité compte » et recommande au moins 150 min hebdomadaires d'activité modérée pour les adultes. L'inactivité accroît le risque de mortalité et de maladies chroniques, tandis que bouger régulièrement apporte de multiples bénéfices.",
    "categories": "sedentarite",
    "readTime": "5 min",
    "content": "L'OMS recommande au moins 150 min d'activité modérée par semaine pour les adultes. Cette activité (marche, sport, etc.) est bénéfique à tous âges. L'inactivité accroît la mortalité de 20-30 % et le risque de maladies chroniques (CVD, diabète, cancers). En bougeant plus (même à intensité modérée), on prévient ces maladies et on améliore sa santé globale.",
    "author": "OMS",
    "published_at": "10 juillet 2024",
    "source": "https://www.who.int/fr/news-room/fact-sheets/detail/physical-activity"
  },
  {
    "id": 19,
    "title": "Alimentation saine",
    "resume": "Une alimentation saine (≥5 portions de fruits et légumes par jour, céréales complètes, faible en sel/sucre/gras saturés) prévient le surpoids, le diabète et les maladies cardiovasculaires. Cette fiche WHO rappelle de limiter le sel à 5 g/jour, les sucres libres à 10 % des calories et les graisses saturées à 10 % pour maximiser ces bienfaits sur la santé.",
    "categories": "alimentaire",
    "readTime": "5 min",
    "content": "La prévention des maladies non transmissibles passe par une alimentation équilibrée : consommer au moins 5 portions de fruits et légumes par jour et des céréales complètes. Il faut limiter le sel (≤5 g/j), les sucres libres (≤10% de l'énergie) et les graisses saturées (≤10%). En suivant ces recommandations de l'OMS, on réduit significativement le risque de surpoids, de diabète et de maladies cardio-vasculaires.",
    "author": "OMS",
    "published_at": "28 avril 2025",
    "source": "https://www.who.int/fr/news-room/fact-sheets/detail/healthy-diet"
  },
  {
    "id": 20,
    "title": "Alcool",
    "resume": "L'OMS rappelle que l'alcool est un facteur de risque pour plus de 200 maladies et cause des millions de décès annuels. Prévenir consiste à boire peu: appliquer des taxes élevées, restreindre la publicité pour l'alcool, et ne pas dépasser les seuils recommandés individuels (0–10 g/jour) afin de protéger sa santé.",
    "categories": "alcool",
    "readTime": "5 min",
    "content": "La prévention des risques liés à l'alcool combine la modération individuelle et des mesures publiques. L'OMS souligne que même de faibles quantités d'alcool augmentent les risques pour la santé. Elle recommande d'appliquer des taxes élevées et de limiter la publicité et la vente d'alcool. Au niveau individuel, limiter sa consommation aux recommandations (0–10 g/jour) réduit nettement les risques de cancers, maladies hépatiques et cardiovasculaires.",
    "author": "OMS",
    "published_at": "28 juin 2024",
    "source": "https://www.who.int/fr/news-room/fact-sheets/detail/alcohol"
  }
];

export async function initDatabase() {
 const database = await db;
 await database.execAsync(`PRAGMA KEY = 'heartcare@take_care';`);

 await database.execAsync(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      resume TEXT,
      categories TEXT,
      readTime TEXT,
      content TEXT NOT NULL,
      author TEXT,
      published_at TEXT,
      source TEXT
    );
  `);

  // Check if articles table is empty and seed if needed
  try {
    const result = await database.getAllAsync('SELECT COUNT(*) as count FROM articles');
    const count = result[0]?.count || 0;
    if (count === 0) {
      // Insert seed articles
      for (const article of SEED_ARTICLES) {
        await insertArticle(article);
      }
    }
  } catch (e) {
    console.warn('Seeding articles failed', e);
  }

    await database.execAsync(`
    CREATE TABLE IF NOT EXISTS prediction_history (
      id INTEGER PRIMARY KEY NOT NULL,
      date TEXT NOT NULL,
      age INTEGER NOT NULL,
      tension INTEGER NOT NULL,
      imc REAL NOT NULL,
      risk_score REAL NOT NULL
      );`);
    }
    
export async function insertArticle(article) {
  const database = await db;
  const { title, resume, categories, readTime, content, author, published_at, source } = article;

  const statement = await database.prepareAsync(
    `INSERT INTO articles (title, resume, categories, readTime, content, author, published_at, source) VALUES ($title, $resume, $categories, $readTime, $content, $author, $published_at, $source);`
  );
  try {
    await statement.executeAsync({
        $title: title,
        $resume: resume,
        $categories: categories,
        $readTime: readTime,
        $content: content,
        $author: author,
        $published_at: published_at,
        $source: source
    });
  } finally {
    await statement.finalizeAsync();
  }
}

export async function fetchArticles() {
  const database = await db;
  const articles = await database.getAllAsync(`SELECT * FROM articles ;`);
  return articles;
}

export async function getArticleById(id) {
  const database = await db;
  const article = await database.getAllAsync(`SELECT * FROM articles WHERE id = $id;`, { $id: id });
  return article[0];
}   

export async function insertPredictionHistory(entry) {
  const database = await db;
  const { date, age, tension, imc, risk_score } = entry;
   const statement = await database.prepareAsync(
    `INSERT INTO prediction_history (date, age, tension, imc, risk_score) VALUES ($date, $age, $tension, $imc, $risk_score);`
  );
  try{
    await statement.executeAsync({
      $date: date,
      $age: age,
      $tension: tension,
      $imc: imc,
      $risk_score: risk_score
  } );
  } finally {
    await statement.finalizeAsync();
  }
}

export async function fetchPredictionHistory() {
  const database = await db;
  const history = await database.getAllAsync(`SELECT * FROM prediction_history ORDER BY date DESC;`);
  return history;
}
import React, { useState } from 'react';
import Map from './Components/Map';
import Button from './Components/Button';
import Slider from './Components/slider';
import { Event, EventYear, Era } from './types';

export const eras: Era[] = [
  { name: "Prehistory", startYear: -Infinity, endYear: -3000 },
  { name: "Ancient History", startYear: -3000, endYear: 500 },
  { name: "Postclassical Era", startYear: 500, endYear: 1450 },
  { name: "The Early Middle Ages", startYear: 500, endYear: 1000 },
  { name: "The High Middle Ages", startYear: 1000, endYear: 1300 },
  { name: "The Late Middle Ages", startYear: 1300, endYear: 1450 },
  { name: "Early Modern Period", startYear: 1450, endYear: 1750 },
  { name: "Modern History", startYear: 1750, endYear: 1945 },
  { name: "Contemporary History", startYear: 1945, endYear: Infinity }
];

const eventsData: EventYear[] = 
[
{
  "era": eras[0],
  "events": [
    {
      "id": "1",
      "name": "Domestication of Plants and Animals in the Fertile Crescent",
      "year": -9500,
      "description": "Beginning of agriculture with the domestication of plants and animals in the Fertile Crescent.",
      "coordinates": { "x": 55, "y": 30 },
    },
    {
      "id": "2",
      "name": "Lascaux Cave Paintings",
      "year": -17000,
      "description": "Creation of the Lascaux cave paintings in France, one of the most famous examples of Paleolithic cave art.",
      "coordinates": { "x": 48, "y": 20 },
    },
    {
      "id": "3",
      "name": "Construction of Stonehenge",
      "year": -2500,
      "description": "The construction of Stonehenge in England, a prehistoric monument of unique circular stone arrangements.",
      "coordinates": { "x": 49, "y": 20 },
    },
    {
      "id": "4",
      "name": "Aboriginal Rock Art in Australia",
      "year": -20000,
      "description": "Creation of rock art by Aboriginal Australians, among the oldest surviving art forms.",
      "coordinates": { "x": 88, "y": 80 },
    },
    {
      "id": "5",
      "name": "Mehrgarh Neolithic Site",
      "year": -7000,
      "description": "Mehrgarh, one of the earliest sites with evidence of farming and herding in South Asia.",
      "coordinates": { "x": 65, "y": 30 },
    },
    {
      "id": "6",
      "name": "Göbekli Tepe",
      "year": -9600,
      "description": "Göbekli Tepe in Turkey, site of the world's oldest known megaliths.",
      "coordinates": { "x": 55, "y": 30 },
    },
    {
      "id": "7",
      "name": "Ardipithecus ramidus in Ethiopia",
      "year": -4400000,
      "description": "Discovery of Ardipithecus ramidus fossils in Ethiopia, providing insight into early human evolution.",
      "coordinates": { "x": 55, "y": 40 },
    },
    {
      "id": "8",
      "name": "Oldest Pottery in China",
      "year": -18000,
      "description": "Creation of the oldest known pottery in the Jiangxi province of China.",
      "coordinates": { "x": 75, "y": 35 },
    },
    {
      "id": "9",
      "name": "Monte Verde in Chile",
      "year": -18500,
      "description": "Evidence of early human settlement in Monte Verde, Chile, challenges traditional views of the timeline of human migration to the Americas.",
      "coordinates": { "x": 30, "y": 75 },
    },
    {
      "id": "10",
      "name": "Clovis Culture in North America",
      "year": -13500,
      "description": "The Clovis culture, characterized by distinctive stone tools, marks one of the earliest known human inhabitations in North America.",
      "coordinates": { "x": 20, "y": 50 },
    },
  ]
},
{
  "era": eras[1],
  "events": [
    {
      "id": "11",
      "name": "Rise of Sumerian Civilization",
      "year": -3500,
      "description": "Emergence of Sumerian civilization in Mesopotamia, marked by the development of cuneiform writing and city-states.",
      "coordinates": { "x": 58, "y": 30 }
    },
    {
      "id": "12",
      "name": "Construction of the Pyramids of Giza",
      "year": -2560,
      "description": "Construction of the Pyramids of Giza in Egypt, one of the Seven Wonders of the Ancient World.",
      "coordinates": { "x": 50, "y": 25 }
    },
    {
      "id": "13",
      "name": "Establishment of the Maurya Empire in India",
      "year": -321,
      "description": "Foundation of the Maurya Empire in India by Chandragupta Maurya, leading to a period of political unity and economic prosperity.",
      "coordinates": { "x": 70, "y": 30 }
    },
    {
      "id": "14",
      "name": "Founding of the Roman Republic",
      "year": -509,
      "description": "Establishment of the Roman Republic, transitioning from monarchical rule to a republican system and laying the groundwork for Roman expansion.",
      "coordinates": { "x": 41, "y": 20 }
    },
    {
      "id": "15",
      "name": "Development of Olmec Civilization in Mesoamerica",
      "year": -1600,
      "description": "Rise of the Olmec civilization in present-day Mexico, known for its monumental sculpture and as a precursor to later Mesoamerican cultures.",
      "coordinates": { "x": 20, "y": 60 }
    },
    {
      "id": "16",
      "name": "Zhou Dynasty’s Mandate of Heaven in China",
      "year": -1046,
      "description": "The Zhou Dynasty claims the Mandate of Heaven, introducing a concept that would influence Chinese imperial philosophy for millennia.",
      "coordinates": { "x": 75, "y": 35 }
    },
    {
      "id": "17",
      "name": "Bantu Migrations in Africa",
      "year": -1000,
      "description": "Start of the Bantu migrations across sub-Saharan Africa, spreading agriculture, language, and iron-making technology.",
      "coordinates": { "x": 55, "y": 50 }
    },
    {
      "id": "18",
      "name": "Rise of the Persian Empire",
      "year": -550,
      "description": "Establishment of the Persian Empire by Cyrus the Great, creating one of the largest empires in history.",
      "coordinates": { "x": 60, "y": 30 }
    },
    {
      "id": "19",
      "name": "Birth of Buddha in Nepal",
      "year": -563,
      "description": "Birth of Siddhartha Gautama (Buddha) in Lumbini, Nepal, leading to the foundation of Buddhism.",
      "coordinates": { "x": 70, "y": 28 }
    },
    {
      "id": "20",
      "name": "Punic Wars between Rome and Carthage",
      "year": -264,
      "description": "Beginning of the Punic Wars between Rome and Carthage, a series of conflicts that would determine the dominance of the Mediterranean.",
      "coordinates": { "x": 40, "y": 20 }
    }
  ]
},
{
  "era": eras[2],
  "events": [
    {
      "id": "21",
      "name": "Rise of the Byzantine Empire",
      "year": 500,
      "description": "Transformation and rise of the Byzantine Empire under Emperor Justinian, marked by the construction of the Hagia Sophia and reconquest of former Roman territories.",
      "coordinates": { "x": 50, "y": 30 }
    },
    {
      "id": "22",
      "name": "Islamic Golden Age",
      "year": 800,
      "description": "Beginning of the Islamic Golden Age, characterized by major advancements in science, technology, medicine, and culture throughout the Islamic world.",
      "coordinates": { "x": 55, "y": 30 }
    },
    {
      "id": "23",
      "name": "Foundation of the Viking Age",
      "year": 793,
      "description": "Start of the Viking Age, marked by the Viking raid on the Lindisfarne Monastery in England, leading to centuries of exploration, trade, and settlement across Europe and the Atlantic.",
      "coordinates": { "x": 10, "y": 50 }
    },
    {
      "id": "24",
      "name": "Establishment of the Khmer Empire",
      "year": 802,
      "description": "Establishment of the Khmer Empire in Southeast Asia, known for its monumental architecture, including the temple complex of Angkor Wat.",
      "coordinates": { "x": 85, "y": 25 }
    },
    {
      "id": "25",
      "name": "Formation of the Holy Roman Empire",
      "year": 962,
      "description": "Formation of the Holy Roman Empire in Europe, an attempt to revive the Western Roman Empire's authority and Christian unity under Germanic rule.",
      "coordinates": { "x": 45, "y": 25 }
    },
    {
      "id": "26",
      "name": "Song Dynasty’s Innovations in China",
      "year": 960,
      "description": "The Song Dynasty in China initiates a period of significant scientific and technological advancements, including the invention of gunpowder and the compass.",
      "coordinates": { "x": 75, "y": 35 }
    },
    {
      "id": "27",
      "name": "Mongol Empire's Expansion",
      "year": 1206,
      "description": "Rise of the Mongol Empire under Genghis Khan, leading to the largest contiguous land empire in history, which connected and influenced many parts of the world.",
      "coordinates": { "x": 65, "y": 40 }
    },
    {
      "id": "28",
      "name": "Mali Empire in West Africa",
      "year": 1235,
      "description": "Rise of the Mali Empire in West Africa, known for its wealth, extensive trade networks, and the university city of Timbuktu.",
      "coordinates": { "x": 40, "y": 60 }
    },
    {
      "id": "29",
      "name": "Black Death in Europe",
      "year": 1347,
      "description": "Arrival of the Black Death in Europe, leading to widespread mortality, social upheaval, and significant changes in European society.",
      "coordinates": { "x": 40, "y": 30 }
    },
    {
      "id": "30",
      "name": "Inca Empire's Establishment",
      "year": 1438,
      "description": "Establishment of the Inca Empire in South America, which would become the largest empire in pre-Columbian America, known for its unique engineering and administrative skills.",
      "coordinates": { "x": 25, "y": 70 }
    }
  ]
},
{
  "era": eras[3],
  "events": [
    {
      "id": "31",
      "name": "Merovingian Dynasty in Francia",
      "year": 500,
      "description": "Establishment of the Merovingian Dynasty in Francia, laying the foundations for the medieval Frankish state.",
      "coordinates": { "x": 45, "y": 25 }
    },
    {
      "id": "32",
      "name": "Spread of Buddhism in China",
      "year": 500,
      "description": "Rapid spread of Buddhism in China during the Southern and Northern Dynasties period, influencing Chinese society and culture.",
      "coordinates": { "x": 75, "y": 35 }
    },
    {
      "id": "33",
      "name": "Slavic Settlements in Eastern Europe",
      "year": 600,
      "description": "Expansion and settlement of Slavic peoples in Eastern Europe, forming the basis for future Slavic states and cultures.",
      "coordinates": { "x": 50, "y": 40 }
    },
    {
      "id": "34",
      "name": "Islamic Conquests",
      "year": 632,
      "description": "Following the death of Muhammad, the Islamic caliphates began a series of conquests, rapidly expanding Muslim territories across the Middle East and North Africa.",
      "coordinates": { "x": 55, "y": 30 }
    },
    {
      "id": "35",
      "name": "Carolingian Renaissance",
      "year": 768,
      "description": "Beginning of the Carolingian Renaissance under Charlemagne, marked by a revival of art, culture, and learning based on classical models.",
      "coordinates": { "x": 48, "y": 20 }
    },
    {
      "id": "36",
      "name": "Viking Settlement of Iceland",
      "year": 874,
      "description": "Norse settlers, known as Vikings, establish permanent settlements in Iceland, marking the beginning of Icelandic history.",
      "coordinates": { "x": 15, "y": 65 }
    },
    {
      "id": "37",
      "name": "Foundation of the Kievan Rus'",
      "year": 882,
      "description": "Establishment of Kievan Rus', a federation of Slavic and Finnic peoples under Varangian rule, which laid the groundwork for modern Russian and Ukrainian states.",
      "coordinates": { "x": 50, "y": 50 }
    },
    {
      "id": "38",
      "name": "Heian Period in Japan",
      "year": 794,
      "description": "Start of the Heian period in Japan, characterized by the flourishing of court culture and the arts, and the establishment of a unique Japanese culture.",
      "coordinates": { "x": 80, "y": 35 }
    },
    {
      "id": "39",
      "name": "Alfred the Great's Reign in England",
      "year": 871,
      "description": "Reign of Alfred the Great in England, known for his defense against Viking invasions, legal reforms, and promotion of education and literacy.",
      "coordinates": { "x": 40, "y": 20 }
    },
    {
      "id": "40",
      "name": "Abbasid Caliphate’s Golden Age",
      "year": 750,
      "description": "The Abbasid Caliphate's Golden Age, a period of cultural, scientific, and economic flourishing in the Islamic world, centered in Baghdad.",
      "coordinates": { "x": 55, "y": 30 }
    }
  ]
},
{
  "era": eras[4],
  "events": [
    {
      "id": "41",
      "name": "Founding of the Holy Roman Empire",
      "year": 1000,
      "description": "Formal establishment of the Holy Roman Empire in Central Europe, symbolizing a continuation of the Roman imperial tradition in the west.",
      "coordinates": { "x": 50, "y": 20 }
    },
    {
      "id": "42",
      "name": "The Crusades",
      "year": 1096,
      "description": "Beginning of the Crusades, a series of religious wars sanctioned by the Latin Church in the medieval period, aimed at recovering the Holy Land from Islamic rule.",
      "coordinates": { "x": 55, "y": 30 }
    },
    {
      "id": "43",
      "name": "Establishment of the University of Bologna",
      "year": 1088,
      "description": "Foundation of the University of Bologna in Italy, the oldest university in the world in continuous operation, marking the beginning of higher education in Europe.",
      "coordinates": { "x": 45, "y": 25 }
    },
    {
      "id": "44",
      "name": "The Reconquista in Spain",
      "year": 1000,
      "description": "Progress of the Reconquista in Spain, the Christian reconquest of the Iberian Peninsula from Muslim rule, spanning several centuries.",
      "coordinates": { "x": 40, "y": 20 }
    },
    {
      "id": "45",
      "name": "Norman Conquest of England",
      "year": 1066,
      "description": "The Norman Conquest of England, following the Battle of Hastings, leading to significant cultural and political changes in England.",
      "coordinates": { "x": 40, "y": 15 }
    },
    {
      "id": "46",
      "name": "The Ghaznavid and Seljuk Turks",
      "year": 1000,
      "description": "Rise of the Ghaznavid and Seljuk Turks, leading to major political and military shifts in the Middle East and Central Asia.",
      "coordinates": { "x": 60, "y": 35 }
    },
    {
      "id": "47",
      "name": "Magna Carta Libertatum",
      "year": 1215,
      "description": "Signing of the Magna Carta in England, a charter of liberties that would become a symbol of the rule of law and influence constitutional principles worldwide.",
      "coordinates": { "x": 40, "y": 20 }
    },
    {
      "id": "48",
      "name": "Mongol Conquests",
      "year": 1206,
      "description": "Beginning of the Mongol invasions and conquests, which would create the largest contiguous land empire in history.",
      "coordinates": { "x": 70, "y": 40 }
    },
    {
      "id": "49",
      "name": "The Ancestral Puebloans in North America",
      "year": 1000,
      "description": "Peak of the Ancestral Puebloan culture in North America, known for their cliff dwellings and intricate road systems.",
      "coordinates": { "x": 30, "y": 50 }
    },
    {
      "id": "50",
      "name": "Foundation of the Song Dynasty in China",
      "year": 1000,
      "description": "Establishment of the Song Dynasty in China, leading to a period of economic prosperity and cultural achievement.",
      "coordinates": { "x": 75, "y": 35 }
    }
  ]
},
{
  "era": eras[5],
  "events": [
    {
      "id": "51",
      "name": "The Hundred Years' War",
      "year": 1337,
      "description": "Start of the Hundred Years' War between England and France, a series of conflicts that reshaped European politics and feudal society.",
      "coordinates": { "x": 45, "y": 20 }
    },
    {
      "id": "52",
      "name": "The Black Death in Europe",
      "year": 1347,
      "description": "The Black Death arrives in Europe, causing widespread devastation and leading to significant social, economic, and cultural change.",
      "coordinates": { "x": 40, "y": 20 }
    },
    {
      "id": "53",
      "name": "Rise of the Ottoman Empire",
      "year": 1300,
      "description": "Beginning of the rise of the Ottoman Empire, which would eventually dominate Southeastern Europe, Western Asia, and North Africa.",
      "coordinates": { "x": 50, "y": 30 }
    },
    {
      "id": "54",
      "name": "The Renaissance in Italy",
      "year": 1400,
      "description": "Start of the Renaissance in Italy, marking a period of significant advances in art, science, and thought, symbolizing the transition to the modern age.",
      "coordinates": { "x": 45, "y": 25 }
    },
    {
      "id": "55",
      "name": "The Ming Dynasty in China",
      "year": 1368,
      "description": "Establishment of the Ming Dynasty in China, initiating a period of stability, cultural revival, and technological advancement.",
      "coordinates": { "x": 75, "y": 35 }
    },
    {
      "id": "56",
      "name": "Timur's Conquests",
      "year": 1370,
      "description": "Conquests of Timur (Tamerlane), leading to the establishment of the Timurid Empire in Persia and Central Asia, influencing the course of Islamic art and architecture.",
      "coordinates": { "x": 60, "y": 35 }
    },
    {
      "id": "57",
      "name": "Establishment of the Inca Empire",
      "year": 1438,
      "description": "Establishment of the Inca Empire in South America, which would become the largest empire in pre-Columbian America.",
      "coordinates": { "x": 25, "y": 70 }
    },
    {
      "id": "58",
      "name": "Fall of Constantinople",
      "year": 1453,
      "description": "Fall of Constantinople to the Ottoman Turks, marking the end of the Byzantine Empire and a pivotal moment in world history, leading to the rise of the Ottoman Empire as a major power.",
      "coordinates": { "x": 50, "y": 30 }
    },
    {
      "id": "59",
      "name": "The Hussite Wars",
      "year": 1419,
      "description": "Outbreak of the Hussite Wars in Bohemia, representing some of the earliest manifestations of Protestant reform movements in Europe.",
      "coordinates": { "x": 50, "y": 20 }
    },
    {
      "id": "60",
      "name": "Advent of the Aztec Empire",
      "year": 1428,
      "description": "Rise of the Aztec Empire in Mesoamerica, known for its advanced architectural and engineering accomplishments, as well as its military conquests.",
      "coordinates": { "x": 20, "y": 50 }
    }
  ]
},
{
  "era": eras[6],
  "events": [
    {
      "id": "61",
      "name": "Fall of Constantinople",
      "year": 1453,
      "description": "The Fall of Constantinople to the Ottoman Turks, marking the end of the Byzantine Empire and a significant shift in the balance of power in Europe and the Mediterranean.",
      "coordinates": { "x": 50, "y": 30 }
    },
    {
      "id": "62",
      "name": "Columbus' Voyage to the New World",
      "year": 1492,
      "description": "Christopher Columbus' first voyage across the Atlantic Ocean, leading to the European discovery of the Americas and the subsequent Age of Exploration.",
      "coordinates": { "x": 30, "y": 70 }
    },
    {
      "id": "63",
      "name": "Protestant Reformation",
      "year": 1517,
      "description": "Start of the Protestant Reformation with Martin Luther's Ninety-Five Theses, challenging the practices of the Catholic Church and leading to significant religious and political upheaval in Europe.",
      "coordinates": { "x": 50, "y": 20 }
    },
    {
      "id": "64",
      "name": "The Spanish Conquest of the Aztec Empire",
      "year": 1521,
      "description": "Conquest of the Aztec Empire by Spanish forces under Hernán Cortés, marking a significant moment in the colonial history of the Americas.",
      "coordinates": { "x": 20, "y": 50 }
    },
    {
      "id": "65",
      "name": "The Scientific Revolution",
      "year": 1543,
      "description": "Beginning of the Scientific Revolution with the publication of Copernicus' work on heliocentric theory, fundamentally changing views on science, nature, and the universe.",
      "coordinates": { "x": 50, "y": 20 }
    },
    {
      "id": "66",
      "name": "The English Civil War",
      "year": 1642,
      "description": "Start of the English Civil War, a conflict between the monarchy and Parliament that led to significant political change and the temporary establishment of a commonwealth.",
      "coordinates": { "x": 40, "y": 20 }
    },
    {
      "id": "67",
      "name": "The Qing Dynasty Establishes Control in China",
      "year": 1644,
      "description": "The Qing Dynasty establishes control over China, marking the beginning of the last imperial dynasty and a period of expansion and consolidation.",
      "coordinates": { "x": 75, "y": 35 }
    },
    {
      "id": "68",
      "name": "Treaty of Westphalia",
      "year": 1648,
      "description": "The Treaty of Westphalia, ending the Thirty Years' War in Europe and establishing the concept of state sovereignty and the modern international order.",
      "coordinates": { "x": 50, "y": 20 }
    },
    {
      "id": "69",
      "name": "The Enlightenment",
      "year": 1685,
      "description": "The Enlightenment begins in Europe, characterized by an emphasis on reason, individualism, and skepticism of traditional authority, influencing various aspects of society, politics, and culture.",
      "coordinates": { "x": 50, "y": 20 }
    },
    {
      "id": "70",
      "name": "The Great Northern War",
      "year": 1700,
      "description": "Start of the Great Northern War, involving Russia, Sweden, and their allies, leading to significant shifts in power in Eastern Europe.",
      "coordinates": { "x": 55, "y": 25 }
    }
  ]
},
{
  "era": eras[7],
  "events": [
    {
      "id": "71",
      "name": "The Industrial Revolution",
      "year": 1760,
      "description": "Beginning of the Industrial Revolution in Great Britain, leading to major social, economic, and technological changes worldwide.",
      "coordinates": { "x": 40, "y": 20 }
    },
    {
      "id": "72",
      "name": "American Revolution",
      "year": 1776,
      "description": "Declaration of Independence by the Thirteen Colonies in North America, leading to the American Revolution and the establishment of the United States of America.",
      "coordinates": { "x": 30, "y": 70 }
    },
    {
      "id": "73",
      "name": "French Revolution",
      "year": 1789,
      "description": "Start of the French Revolution, leading to the rise of democracy and the fall of the monarchy, with significant long-term global impact on politics and society.",
      "coordinates": { "x": 48, "y": 20 }
    },
    {
      "id": "74",
      "name": "Napoleonic Wars",
      "year": 1803,
      "description": "Outbreak of the Napoleonic Wars, which saw the expansion of the French Empire under Napoleon Bonaparte and reshaped the map of Europe.",
      "coordinates": { "x": 48, "y": 20 }
    },
    {
      "id": "75",
      "name": "Unification of Germany",
      "year": 1871,
      "description": "Unification of Germany under Prussian leadership, marking the establishment of the German Empire and a shift in European power dynamics.",
      "coordinates": { "x": 50, "y": 20 }
    },
    {
      "id": "76",
      "name": "World War I",
      "year": 1914,
      "description": "Start of World War I, a global conflict originating in Europe that led to significant changes in the political landscape and the decline of many empires.",
      "coordinates": { "x": 50, "y": 20 }
    },
    {
      "id": "77",
      "name": "Russian Revolution",
      "year": 1917,
      "description": "The Russian Revolution, leading to the overthrow of the Tsarist regime and the establishment of the Soviet Union, the world’s first communist state.",
      "coordinates": { "x": 60, "y": 50 }
    },
    {
      "id": "78",
      "name": "The Great Depression",
      "year": 1929,
      "description": "The onset of the Great Depression, a severe worldwide economic crisis that led to widespread unemployment and significant political and social changes.",
      "coordinates": { "x": 40, "y": 50 }
    },
    {
      "id": "79",
      "name": "World War II",
      "year": 1939,
      "description": "Beginning of World War II, the deadliest conflict in human history, involving global powers and leading to major geopolitical changes, including the emergence of the United States and the Soviet Union as superpowers.",
      "coordinates": { "x": 50, "y": 20 }
    },
    {
      "id": "80",
      "name": "Atomic Bombings of Hiroshima and Nagasaki",
      "year": 1945,
      "description": "The United States drops atomic bombs on the Japanese cities of Hiroshima and Nagasaki, leading to Japan's surrender and the end of World War II.",
      "coordinates": { "x": 70, "y": 35 }
    }
  ]
},
{
  "era": eras[8],
  "events": [
    {
      "id": "81",
      "name": "End of World War II",
      "year": 1945,
      "description": "World War II ends with the unconditional surrender of the Axis powers, leading to the establishment of the United Nations and setting the stage for the Cold War.",
      "coordinates": { "x": 50, "y": 20 }
    },
    {
      "id": "82",
      "name": "Formation of the United Nations",
      "year": 1945,
      "description": "Establishment of the United Nations, an international organization aimed at promoting peace, security, and cooperation among countries.",
      "coordinates": { "x": 40, "y": 40 }
    },
    {
      "id": "83",
      "name": "Decolonization of Africa and Asia",
      "year": 1947,
      "description": "Start of the decolonization process in Africa and Asia, leading to the independence of many nations from European colonial rule.",
      "coordinates": { "x": 60, "y": 30 }
    },
    {
      "id": "84",
      "name": "Cold War",
      "year": 1947,
      "description": "Beginning of the Cold War, a period of geopolitical tension between the Soviet Union and the United States and their respective allies.",
      "coordinates": { "x": 50, "y": 50 }
    },
    {
      "id": "85",
      "name": "Space Race",
      "year": 1957,
      "description": "Start of the Space Race between the Soviet Union and the United States, marking a significant period of technological and scientific advancements.",
      "coordinates": { "x": 50, "y": 50 }
    },
    {
      "id": "86",
      "name": "Fall of the Berlin Wall",
      "year": 1989,
      "description": "The fall of the Berlin Wall, symbolizing the end of the Cold War and leading to the reunification of East and West Germany.",
      "coordinates": { "x": 50, "y": 20 }
    },
    {
      "id": "87",
      "name": "Internet Revolution",
      "year": 1990,
      "description": "The rapid development and expansion of the Internet, leading to significant changes in global communication, commerce, and culture.",
      "coordinates": { "x": 40, "y": 50 }
    },
    {
      "id": "88",
      "name": "9/11 Terrorist Attacks",
      "year": 2001,
      "description": "Terrorist attacks on September 11, 2001, in the United States, leading to the War on Terror and significant changes in global security policies.",
      "coordinates": { "x": 30, "y": 70 }
    },
    {
      "id": "89",
      "name": "Global Financial Crisis",
      "year": 2008,
      "description": "The global financial crisis, originating in the United States, leading to significant economic downturns worldwide.",
      "coordinates": { "x": 40, "y": 50 }
    },
    {
      "id": "90",
      "name": "COVID-19 Pandemic",
      "year": 2019,
      "description": "The outbreak of the COVID-19 pandemic, causing a global health crisis and leading to widespread social and economic disruptions.",
      "coordinates": { "x": 50, "y": 30 }
    }
  ]
}
]

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(eventsData[0].events[0].year);
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [descriptionPosition, setDescriptionPosition] = useState<{ x: number; y: number } | null>(null);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setShowDescription(false);
  };

  const handlePinClick = (event: Event, coordinates: { x: number; y: number }) => {
    setActiveEvent(event);
    setDescriptionPosition(coordinates);
    setShowDescription(true);
  };

const minYear = Math.min(...eventsData.flatMap(e => e.events.map(event => event.year)));
const maxYear = Math.max(...eventsData.flatMap(e => e.events.map(event => event.year)));


  return (
    <div className="App flex flex-col items-center justify-center min-h-screen">
      <div className='text-2xl font-bold'>Timeline Map</div>
      <div>Current Time: {selectedYear}</div>
      <Slider
        min={minYear}
        max={maxYear}
        defaultValue={minYear}
        onChange={handleYearChange}
      />
      <div className="w-full flex-grow">
        <Map
          events={eventsData}
          selectedYear={selectedYear}
          onPinClick={handlePinClick}
        />
      </div>
      {showDescription && descriptionPosition && activeEvent && (
        <div
          className="absolute bg-white p-4 border rounded shadow-lg"
          style={{
            left: `${descriptionPosition.x}%`,
            top: `${descriptionPosition.y}%`,
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          <h1 className="text-lg font-bold">{activeEvent.name}</h1>
          <p className="text-sm">{activeEvent.description}</p>
          <Button eventData={activeEvent} />
        </div>
      )}
    </div>
  );
};

export default App;
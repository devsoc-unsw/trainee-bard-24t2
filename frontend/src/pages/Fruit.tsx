import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppShell, Button, Grid, SegmentedControl, ScrollArea, Skeleton } from '@mantine/core';
import { FaArrowLeft } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import FruitStyles from "./Fruit.module.css";
import FruitImage from "../assets/tempfruit.avif";
import axios from "axios";
import NutrientBlock from "../components/NutrientBlock";

interface VariantOption {
  name: string;
  variantIndex: number
}

function Fruit() {
  const { fruitName } = useParams();
  const [variantNutrition, setVariantNutrition] = useState({});
  const [variantOptions, setVariantOptions] = useState<VariantOption[]>([]);
  const [variantIndex, setVariantIndex] = useState("0");
  const [variantTotalFruit, setVariantTotalFruit] = useState(2);
  const [fruitImgUrl, setFruitImgUrl] = useState(FruitImage)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5180/fruit`, {
            params: { fruit: fruitName, variantIndex: Number(variantIndex) }
          }
        );

        setVariantNutrition(response.data.nutrition);
        setVariantOptions(response.data.variants);
        setVariantTotalFruit(response.data.variants.length);
        setFruitImgUrl(response.data.imgUrl);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fruitName, variantIndex]);

  const nutrients = useMemo(() => {
    return Object.entries(variantNutrition).map(([category, value], index) => {

      return (
        <NutrientBlock category={category} value={value} index={index}/>
      )
    })
  }, [variantNutrition]);

  return (
    <AppShell>
      <Navbar/>
      <AppShell.Main className={FruitStyles.main}>
        {/* Gutter causes overflow issues */}
        <Grid gutter="0" align="stretch" className={FruitStyles.mainContainer}>
          <Grid.Col span={12}>
            <h1 className={FruitStyles.pageHeader}>{fruitName}</h1>
          </Grid.Col>
          <Grid.Col offset={0.25} span={5} className={FruitStyles.bottomLeftContainer}>
            {(variantTotalFruit > 1) 
              ? (variantOptions.length > 0)
                ? <SegmentedControl fullWidth size="md" value={variantIndex} onChange={(value) => setVariantIndex(value)} data={variantOptions.map(elem => {return {label: elem.name, value: elem.variantIndex.toString()}})} radius="md"/>
                : <SegmentedControl fullWidth size="md" value={""} data={["Go", "jo"]} radius="md"/>
              : <div/>}
            <img src={fruitImgUrl} alt="Image of Fruit" className={FruitStyles.fruitImage}/>
            <Link to="/search">
              <Button
                className="button2"
                leftSection={<FaArrowLeft />}
                variant="outline"
                size="lg"
                radius="md"
                fw={500}
              >
                Other fruits
              </Button>
            </Link>
          </Grid.Col>
          <Grid.Col offset={0.25} span={6}>
             <ScrollArea type="always" className={FruitStyles.scrollable}>
              {/* Needed because opacity ruined the white colour of the nutrient containers */}
              <div className={FruitStyles.opaqueBackground}/>
                {(variantOptions.length > 0) ?
                  <div className={FruitStyles.nutrientsContainerWrapper}>
                    {nutrients}
                  </div> :
                  <>
                    <p>Satoru Gojo (Japanese: 五条 悟, Hepburn: Gojō Satoru) is a fictional character from Gege Akutami's manga Jujutsu Kaisen. He was first introduced in Akutami's short series Tokyo Metropolitan Curse Technical School as the mentor of the cursed teenager Yuta Okkotsu at Tokyo Prefectural Jujutsu High School. This miniseries became the prequel Jujutsu Kaisen 0 of Jujutsu Kaisen. In Jujutsu Kaisen, Gojo takes the same role but mentors the student Yuji Itadori who suffers a similar Curse, helping him become stronger while protecting other characters in the series.

Gojo was designed by Gege Akutami to be a formidable yet endearing figure who is passionate about his students. He is voiced by Yūichi Nakamura in Japanese and Kaiji Tang in English in the animated adaptations by MAPPA.

The character was well received by the media for his carefree nature and power shown when protecting his students, becoming the series's breakout character. Furthermore, his role in the prequel Jujutsu Kaisen 0 was appreciated by the media due to his hidden depths such as his relationship with the antagonist Suguru Geto. The twist of the manga chapter involving Gojo's death led to manga artist Kenjiro Hata go on a hiatus from writing the manga Fly Me to the Moon due to the need of recovering from the "shocking" event. According to IGN, Akutami received death threats over the death of Gojo which came across as a shocking event to several manga readers. In September 2023, leaks of the manga's 236th chapter cause a major controversy online within fans of the series. The contents of the chapter surprised fans so much that they took to social media to react to the new development. At time of publication, the "#GojoSatoru" hashtag was trending on X with more than 11,400 posts. Comic Book Resources had mixed opinions about Gojo's death, praising the event for the major impact it resulted in the entire narrative since nearly most of the surviving characters watching his death were his students but still felt like Akutami was trying too hard to make Jujutsu Kaisen a dark series by killing several characters in the Shinjuku arc. </p> <b>Gojo's death despite his confidence when confronting Sukuna and Kenjaku became famous in social media due to the ironic result.</b> <p>

The character has often been compared with Killua Zoldyck from Hunter × Hunter due to physical and personality similarities. When Mariya Ise was cast to portray the younger Gojo in a flashback from the anime's second season, Hindustan Times said the "meme came to life" as Ise was also popular for voicing Killua and fans were happy with such casting.
                    </p>
                  </>
                }
              </ScrollArea>
          </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}

export default Fruit;

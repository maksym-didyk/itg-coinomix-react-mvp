import * as React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { CardNews } from '../components/CardNews';
import { CryptoString } from '../components/CryptoString';
import { BlockLatestNews } from '../components/BlockLatestNews';
import { CardBanner } from '../components/CardBanner';
import { Devider } from '../components/Devider';
import { CardNewsType } from '../types/enums';
import { ArticleCaregoryData, ArticleData } from '../types/articleType';
import { getArticlesSortedByDate, getCategories } from '../utils/api_helpers';
import { Loader } from '../components/Loader';
import bannerEpicurus from '../assets/images/banners/banner_epicurus.png';
import bannerItg from '../assets/images/banners/banner_itg.svg';
import useTitle from '../utils/useTitle';
import { BlockCategoryNewsHome } from '../components/BlockCategoryNewsHome/BlockCategoryNewsHome';

export const HomePage = () => {
  const [articles, setArticles] = React.useState<ArticleData[]>([]);
  const [categories, setCategories] = React.useState<ArticleCaregoryData[]>([]);
  const [isLoading, seIsLoading] = React.useState(true);

  useTitle('Home Page | Coinomix');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadData = async () => {
    const articlesDataApi = await getArticlesSortedByDate();
    const categoriesDataApi = await getCategories();

    setArticles(articlesDataApi.data);
    setCategories(categoriesDataApi.data);

    seIsLoading(false);
  };

  const topNewsData = () => {
    const topNewsDataApi = articles.find(article => article.attributes.top_home);

    return topNewsDataApi ? topNewsDataApi.attributes : articles[0].attributes;
  };

  React.useEffect(() => {
    scrollToTop();
    loadData();
  }, []);

  if (isLoading) {
    return (
      <Loader />
    )
  };

  return (
    <>
      <Header />

      <main className='main'>
        <div className='main__container'>
          <section className='main__topblock'>
            <div className='main__topnews'>
              <CardNews type={CardNewsType.top} article={topNewsData()} />
            </div>

            <div className='main__latestnews'>
              <BlockLatestNews articles={articles} />
            </div>

          </section>

          <Devider />

          <CryptoString />

          <Devider />

          <CardBanner imgUrl={bannerEpicurus} link='epicurus.io' />

          {categories.slice(0, 5).map((category) => (
            <BlockCategoryNewsHome category={category} />
          ))}

          <Devider />         

          <CryptoString />

          <Devider />

          <CardBanner imgUrl={bannerItg} link='itg-investments.com' />
        </div>
      </main>

    <footer>
      <Footer />
    </footer>
    </>
  )
}

export default HomePage;

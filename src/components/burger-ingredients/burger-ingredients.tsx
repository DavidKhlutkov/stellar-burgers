import { useState, useRef, useEffect, FC, useMemo, KeyboardEvent } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector } from '../../services/store';
import { getIngredientsSelectors } from '@slices';

export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */
  const ingredients = useSelector(getIngredientsSelectors);
  const buns = useMemo(
    () => ingredients.filter((ing) => ing.type === 'bun'),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((ing) => ing.type === 'main'),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((ing) => ing.type === 'sauce'),
    [ingredients]
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  // useEffect(() => {
  //   if (inViewBuns) {
  //     setCurrentTab('bun');
  //   } else if (inViewSauces) {
  //     setCurrentTab('sauce');
  //   } else if (inViewFilling) {
  //     setCurrentTab('main');
  //   }
  // }, [inViewBuns, inViewFilling, inViewSauces]);

  useEffect(() => {
    const onSwitchTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        if (currentTab === 'bun') {
          setCurrentTab('main');
          titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        if (currentTab === 'main') {
          setCurrentTab('sauce');
          titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        if (currentTab === 'sauce') {
          setCurrentTab('bun');
          titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('keydown', onSwitchTab as () => void);
    return () => {
      document.removeEventListener('keydown', onSwitchTab as () => void);
    };
  }, [currentTab]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};

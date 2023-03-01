const elbrusImage = new URL('../images/elbrus.jpeg', import.meta.url);
const italyImage = new URL('../images/Italy.jpeg', import.meta.url);
const norwayImage = new URL('../images/norway.jpeg', import.meta.url);
const baikalImage = new URL('../images/baikal.jpeg', import.meta.url);
const kamchatkaImage = new URL('../images/kamchatka.jpeg', import.meta.url);
const arkhyzImage = new URL('../images/arkhyz.jpeg', import.meta.url);

const initialCards = [
    {
      name: 'Эльбрус',
      link: elbrusImage
    },
    {
      name: 'Италия',
      link: italyImage
    },
    {
      name: 'Норвегия',
      link: norwayImage
    },
    {
      name: 'Байкал',
      link: baikalImage
    },
    {
      name: 'Камчатка',
      link: kamchatkaImage
    },
    {
      name: 'Архыз',
      link: arkhyzImage
    }
  ];

export { initialCards };
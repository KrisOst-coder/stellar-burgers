describe('проверяем функциональность приложения', () => {
    const ingredientDetails = 'Детали ингредиента';
    const addButton = 'Добавить';
    const chooseBuns = 'Выберите булки';
    const chooseMains = 'Выберите начинку';
  
    it('сервис должен быть доступен по адресу localhost:4000', function () {
      cy.visit('/');
    });
  
    beforeEach(() => {
      cy.viewport(1300, 800);
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json'
      }).as(`${'ingredients'}`);
      cy.intercept('GET', 'api/auth/user', {
        fixture: 'user.json'
      }).as(`${'user'}`);
      cy.setCookie('accessToken', 'mockAccessToken');
      window.localStorage.setItem('refreshToken', 'mockReshToken');
      cy.visit('/');
    });
  
    afterEach(() => {
      cy.setCookie('accessToken', '');
      window.localStorage.setItem('refreshToken', '');
    });
  
    it('моковые данные для ингредиентов', function () {
      cy.wait(['@ingredients']);
    });

    describe('тестирование модальных окон', () => {
        beforeEach(() => {
          const ingredient = cy.contains('Биокотлета из марсианской Магнолии');
          ingredient.click({force: true});
        });
        it('открытие модального окна', () => {
          cy.contains(ingredientDetails).should('exist');
          cy.get('li').children('p').contains('Калории, ккал').next('p').contains('4242');
          cy.get('li').children('p').contains('Белки, г').next('p').contains('420');
          cy.get('li').children('p').contains('Жиры, г').next('p').contains('142');
          cy.get('li').children('p').contains('Углеводы, г').next('p').contains('242');
        });
        it('закрытие по клику на крестик', () => {
            cy.contains(ingredientDetails).should('exist');
            cy.get('[data-cy="modal-close"]').click({ force: true });
            cy.contains(ingredientDetails).should('not.exist');
        });
      
        it('закрытие по клику на оверлэй', () => {
            cy.contains(ingredientDetails).should('exist');
            cy.get('body').type('{esc}');
            cy.contains(ingredientDetails).should('not.exist');
        });
    });

    describe('тестирование добавления ингредиентов в конструктор', () => {
        it('добавление булки в конструктор', () => {
          const buns = cy.get('h3').contains('Булки').next('ul');
          const bunsAddButton = buns.contains(addButton);
          cy.get('div').contains(chooseBuns).should('exist');
          bunsAddButton.click({force: true});
          cy.get('div').contains(chooseBuns).should('not.exist');
        });
    
        it('добавление ингредиента в конструктор', () => {
          const mains = cy.get('h3').contains('Начинки').next('ul');
          const mainsAddButton = mains.contains(addButton);
          cy.get('div').contains(chooseMains).should('exist');
          mainsAddButton.click({force: true});
          cy.get('div').contains(chooseMains).should('not.exist');
        });
      });
      describe('тестирование оформления заказа', () => {
        it('проверка пользователя с моковыми данными', () => {
          cy.contains('OstKris').should('exist');
        });
    
        it('клик по кнопке «Оформить заказ»', () => {
          cy.intercept('POST', 'api/orders', {
            fixture: 'order.json'
          }).as(`${'order'}`);
    
          const buns = cy.get('h3').contains('Булки').next('ul');
          const bunsAddButton = buns.contains(addButton);
          bunsAddButton.click({force: true});
    
          const mains = cy.get('h3').contains('Начинки').next('ul');
          const mainsAddButton = mains.contains(addButton);
          mainsAddButton.click({force: true});
    
          const orderRequestButton = cy.contains('Оформить заказ');
          orderRequestButton.click({force: true});
    
          cy.contains('1');
    
          cy.get('body').type('{esc}');
    
          cy.contains('36112').should('not.exist');
          cy.contains(chooseBuns).should('exist');
          cy.contains(chooseMains).should('exist');
        });
      });
  });
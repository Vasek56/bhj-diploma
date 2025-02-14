/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  update() {
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const select = this.element.querySelector('.accounts-select'),
    renderItem = item => select.innerHTML += `<option value="${item.id}">${item.name}</option>`;
    Account.list({}, (err, response) => {
      if (!response.data) {
        return
      }
      select.innerHTML = '';
      response.data.forEach(renderItem);
    });

  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(options.data, (err, response) => {
      if (!response.success) {
        return
      }
      this.element.reset();
      if(this.element.id === 'new-income-form') {
        return App.getModal('newIncome').close();
      }
      App.getModal('newExpense').close();

    });
    App.update();

  }
}
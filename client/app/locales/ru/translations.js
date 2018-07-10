export default {
    errors: {
        description: "Значение",
        inclusion: "{{description}} не входит в список",
        exclusion: "{{description}} недопустимо",
        invalid: "{{description}} не корректно",
        confirmation: "{{description}} не совпадает с {{on}}",
        accepted: "{{description}} must be accepted",
        empty: "{{description}} не может быть пустым",
        blank: "{{description}} должно быть указано",
        present: "{{description}} должно быть пустым",
        collection: "{{description}} должно быть коллекцией",
        singular: "{{description}} должно быть единственным",
        tooLong: "{{description}} слишком длинное (максимум {{max}} символов)",
        tooShort: "{{description}} слишком короткое (минимум {{min}} символов)",
        before: "{{description}} must be before {{before}}",
        after: "{{description}} must be after {{after}}",
        wrongDateFormat: "{{description}} должно быть вида {{format}}",
        wrongLength: "{{description}} имеет не верную длину (должно быть {{is}} символов)",
        notANumber: "{{description}} должно быть числом",
        notAnInteger: "{{description}} должно быть целым числом",
        greaterThan: "{{description}} должно быть больше чем {{gt}}",
        greaterThanOrEqualTo: "{{description}} должно быть больше или равно {{gte}}",
        equalTo: "{{description}} должно быть равно {{is}}",
        lessThan: "{{description}} должно быть меньше чем {{lt}}",
        lessThanOrEqualTo: "{{description}} должно быть меньше или равно {{lte}}",
        otherThan: "{{description}} должно отличаться от {{value}}",
        odd: "{{description}} должно быть четным",
        even: "{{description}} должно быть нечетным",
        positive: "{{description}} должно быть больше 0",
        date: "{{description}} должно быть корректной датой",
        onOrAfter: '{{description}} must be on or after {{onOrAfter}}',
        onOrBefore: '{{description}} must be on or before {{onOrBefore}}',
        email: "{{description}} должно быть корректным email адресом",
        phone: "{{description}} должно быть корректным номером телефона",
        url: "{{description}} должно быть корректным url адресом"
    },
    "auth.login.label": "Войти",
    "auth.login.password": "Пароль",
    "auth.login.password.change": "Восстановить доступ",
    "auth.login.access.restore": "Доступ восстановлен. Используйте новый пароль для входа",
    "auth.login.do.register": "Зарегистрироваться",
    "auth.login.login.not.free": "Логин занят",
    "auth.login.login.text.must.be": "Логин должен быть заполнен",
    "auth.login.bad.credentials": "Неверные учетные данные",
    "auth.login.empty.err": "Все поля должны быть заполнены",
    "auth.login.phone": "Телефон",
    "auth.login.email": "E-mail",
    "auth.login.not.uniq": "Такой пользователь уже существует",
    "auth.login.socialNetwork": "Социальная сеть",
    "auth.login.socialNetwork.bind": "Привязать",
    "auth.login.socialNetwork.unbind": "Отвязать учетную запись Вконтакте",
    "auth.login.username": "Логин",
    "auth.login.password.set.label": "Введите новый пароль",
    "auth.login.password.repeat.label": "Повторите пароль",
    "auth.registration.password.validation.message": "{{description}} должно содержать цифры, заглавные и строчные латинские символы",
    "button.back": "Назад",
    "button.save": "Сохранить",
    "user.get.id.null": "Не задан идентификатор пользователя",
    "user.get.user.not.found": "Пользователь с таким идентификатором не найден",
    "user.get.user.by.phone.not.found": "Пользователь с таким номером телефона не найден",
    "find.value.null": "Не передан параметр поиска",
    "user.fine.not.found": "Пользователи по запросу на найдены",
    "user.block.not.admin": "Блокировать пользователей могут только администраторы",
    "service.get.id.null": "Не задан идентификатор услуги",
    "service.get.user.not.found": "Услуга с таким идентификатором не найдена",
    "service.fine.not.found": "Услуги по запросу на найдены",
    "service.create.params.null": "Все параметры должны быть заданы",
    "service.create.not.admin": "Создавать услуги могут только админы",
    "service.delete.not.admin": "Удалять услуги могут только администраторы",
    "service.in.tickets": "На данную услугу существуюет активная запись",
    "ticket.get.id.null": "Не задан идентификатор записи",
    "ticket.get.user.not.found": "Запись с таким идентификатором не найдена",
    "ticket.fine.not.found": "Записи по запросу на найдены",
    "ticket.create.params.null": "Все параметры должны быть заданы",
    "ticket.delete.not.admin": "Удалять услуги могут только администраторы",
    "ticket.edit.not.admin": "Изменять тикеты могут только админы",
    "ticket.fio.empty": "Для пользователя не указаны фамилия и имя",
    "worktime.get.id.null": "Не задан идентификатор настройки рабочего времени",
    "worktime.get.user.not.found": "Настройка рабочего времени с таким идентификатором не найдена",
    "worktime.fine.not.found": "Настройки рабочего времени по запросу на найдены",
    "worktime.create.params.null": "Все параметры должны быть заданы",
    "worktime.create.not.admin": "Создавать настройку могут тоьлко админы",
    "worktime.delete.not.admin": "Удалять настройки рабочего времени могут только администраторы",
    "worktime.getslots.params.null": "Не указано время, мастер или дата записи",
    "worktime.weekend": "выходной",
    "slots.not.found": "Слоты для данного мастера на данную дату не найдены",
    "business.get.id.null": "Не задан идентификатор организации",
    "business.get.user.not.found": "Организация с таким идентификатором не найдена",
    "business.fine.not.found": "Оганизации по запросу на найдены",
    "business.create.params.null": "Все параметры должны быть заданы",
    "business.delete.not.admin": "Удалять организации могут только администраторы",
    "business.create.not.admin": "Создавать организации могут только админы",
    "business.update.not.admin": "Изменять организации могут только админы",
    "business.value.null": "Не задано значение для поиска",
    "business.update.params.null": "Не верно переданы значения для обновления организации",
    "auth.login.in": "Войти",
    "auth.login.register": "регистрация",
    "main.info.about": "О проекте",
    "auth.reg.pass2.fail": "Пароли не совпадают",
    "springSecurity.oauth.registration.link.not.exists": "Нет связанного аккаунта",
    "springSecurity.oauth.registration.create.legend": "Создать привязанный аккаунт",
    "auth.login.password2": "Повтор пароля",
    "springSecurity.oauth.registration.create.gens": "Сгенерировать учетные данные",
    "springSecurity.oauth.registration.create.button": "Создать",
    "springSecurity.oauth.registration.login.legend": "Привязать существующий аккаунт",
    "springSecurity.oauth.registration.login.button": "Войти",
    "springSecurity.oauth.registration.back": "Вернуться на форму входа",
    "service.label": "услуга",
    "service.list.label": "Список услуг",
    "service.new.label": "Новая услуга",
    "service.create.label": "Создать услугу",
    "service.edit.label": "Редактировать услугу",
    "service.show.label": "Показать услугу",
    "service.name.label": "Название",
    "service.cost.label": "Стоимость",
    "service.time.label": "Продолжительность",
    "service.masters.label": "Мастера",
    "service.partOfList.label": "Сделать подуслугой",
    "service.partOfList.help": "Услуга может использоваться только в составной услуге",
    "serviceGroup.label": "составная услуга",
    "serviceGroup.list.label": "Список составных услуг",
    "serviceGroup.new.label": "Новая составная услуга",
    "serviceGroup.create.label": "Создать составную услугу",
    "serviceGroup.edit.label": "Редактировать составную услугу",
    "serviceGroup.show.label": "Показать составную услугу",
    "serviceGroup.name.label": "Название",
    "serviceGroup.services.label": "Услуги",
    "serviceGroup.services.help": "Добавьте услуги, из которых состоит эта услуга. Порядок следования услуг можно менять с помощью перетаскивания.",
    "serviceGroup.servicesModal.help": "Для добавления услуг перейдите в \"Услуги\" → \"Новая услуга\"",
    "serviceGroup.masters.label": "Мастер",
    "serviceGroup.cost.label": "Стоимость",
    "serviceGroup.time.label": "Время",
    "serviceGroup.subservice.label": "подуслуга",
    "serviceGroup.subservices.label": "Подуслуги",
    "serviceGroup.service.is.subservice": "Данная услуга является частью комплексной услуги {{0}} (Идентификатор {{1}}), необходимо сначала удалить ее оттуда",
    "serviceToGroup.not.found": "Связь не найдена",
    "serviceToGroup.get.id.null": "Не передан идентификатор связи",
    "serviceToGroup.delete.not.admin": "Удалять связи может только мастер",
    "serviceToGroup.serviceOrder.label": "Порядок",
    "serviceToGroup.serviceTimeout.label": "Перерыв",
    "ticket.label": "Запись",
    "ticket.list.label": "Список записей",
    "ticket.new.label": "Новая запись",
    "ticket.create.label": "Создать запись",
    "ticket.edit.label": "Редактировать запись",
    "ticket.show.label": "Показать запись",
    "ticket.delete.label": "Удалить",
    "ticket.reject.label": "Отклонить",
    "ticket.accept.label": "Подтвердить",
    "ticket.ticketDate.label": "Дата",
    "ticket.time.label": "Время",
    "ticket.comment.label": "Комментарий",
    "ticket.master.label": "Мастер",
    "ticket.user.label": "Клиент",
    "ticket.services.label": "Услуги",
    "ticket.status.label": "Статус",
    "ticket.validate.ids.null": "Не переданы идентификаторы записей",
    "ticket.timeMin.label": "мин.",
    "ticket.duration.label": "Продолжительность",
    "ticket.cost.label": "Стоимость",
    "ticket.showFrom.label": "Показать за",
    "ticket.byDay.label": "день",
    "ticket.byWeek.label": "неделю",
    "ticket.byMonth.label": "месяц",
    "ticket.id.label": "#",
    "ticket.addUser.help": "Добавить нового клиента по номеру телефона",
    "ticket.emptyServices.help": "У выбранного мастера не добавлены услуги",
    "ticket.number.label": "Запись #",
    "ticket.phone.label": "Телефон",
    "ticket.timeEnd.label": "Время окончания",
    "ticket.shift.params.null": "Для сдвига талонов необходимо указать идентификтор первого талона и время сдвига",
    "ticket.shift.notmaster": "Сдвигать талоны может только мастер",
    "ticket.swap.params.null": "Необходимо указать идентификаторы тикетов",
    "business.label": "организация",
    "business.list.label": "Список организаций",
    "business.new.label": "Новая организация",
    "business.create.label": "Создать организацию",
    "business.edit.label": "Редактировать организацию",
    "business.show.label": "Показать организацию",
    "business.name.label": "Название",
    "business.inn.label": "ИНН",
    "business.address.label": "Адрес",
    "business.phone.label": "Телефон",
    "business.email.label": "Эл. почта",
    "business.description.label": "Описание",
    "business.masters.label": "Мастера",
    "business.mode.label": "Режим работы",
    "business.contacts.label": "Контакты",
    "user.label": "пользователь",
    "user.list.label": "Список пользователей",
    "user.new.label": "Новый пользователь",
    "user.create.label": "Создать пользователя",
    "user.edit.label": "Редактировать пользователя",
    "user.show.label": "Показать пользователя",
    "user.username.label": "Логин",
    "user.email.label": "Эл. почта",
    "user.firstname.label": "Имя",
    "user.secondname.label": "Фамилия",
    "user.phone.label": "Телефон",
    "user.sms.login": "Логин для \"СМСЦентр\"",
    "user.sms.pass": "Пароль для \"СМСЦентр\"",
    "user.sms.help": "Используется для отправки смс через \"СМСЦентр\" для текущего пользователя",
    "user.business.label": "Организация",
    "user.double.phone": "Пользователь с таким номером телефона уже существует",
    "user.phone.null": "Не указан номер телефона",
    "user.lk.label": "Личный кабинет",
    "user.changePassword.label": "Сменить пароль",
    "user.forgetPassword.label": "Забыли пароль?",
    "auth.sms.code.send.label": "Получить код в смс",
    "auth.sms.code.set.label": "Введите код из смс",
    "auth.sms.code.finish.label": "Завершить",
    "user.block.id.null": "Не передан идентификатор пользователя",
    "user.block.not.master": "Только мастер может блокировать",
    "user.block.user.not.found": "Не найден блокируемый пользователь или он уже заблокирован",
    "worktime.label": "Режим работы",
    "workTime.dayOfWeek.label": "День недели",
    "workTime.timeFrom.label": "Время с",
    "workTime.timeTo.label": "Время до",
    "workTime.params.null": "Необходимо указать мастера, день недели, время С и время ПО",
    "workTime.params.master.not.found": "Мастер по указанному идентификатору не найден",
    "workTime.not.found": "Промежуток рабочего времени с таким индентификатором не найден",
    "workTime.create.only.admin": "Настраивать рабочее время может только мастер",
    "holiday.label": "Нерабочие дни",
    "holiday.dateFrom.label": "Дата начала",
    "holiday.dateTo.label": "Дата окончания",
    "holiday.comment.label": "Комментарий",
    "holiday.params.null": "Необходимо указать мастера, дату начала и дату конца",
    "holiday.params.master.not.found": "Мастер по указанному идентификатору не найден",
    "holiday.not.found": "Нерабочий день с таким индентификатором не найден",
    "holiday.create.only.admin": "Настраивать нерабочие дни может только мастер",
    "params.id.null": "Необходимо указать id",
    "services.group.id.null": "Не указан идентификатор группы",
    "services.group.not.found": "Группа не найдена",
    "services.group.params.null": "Необходимо указать услугу, время перерыва и порядок",
    "search.dateFrom.label": "Дата начала",
    "search.dateTo.label": "Дата окончания",
    "search.date.label": "Дата",
    "search.find.label": "Найти",
	"search.clear.label": "Очистить",
	"currency.sign": "₽"
};

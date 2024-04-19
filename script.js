define(["jquery"], function ($) {
  var CustomWidget = function () {
    var self = this,
      system = self.system;
    this.callbacks = {
      settings: function () {},
      init: function () {
        return true;
      },
      bind_actions: function () {
        return true;
      },
      render: function () {
        const userData = {
          users: {
            //Дима
            8043655: {
              staff: "egorovdmitrii",
            },
						//Дима тест
						10598585: {
              staff: "egorovdmitrii",
            },
            //Федя
            8056487: {
              staff: "fa-koloskov",
            },
            //Сервис бот
            7989952: {
              staff: "cargo_service_bot_amo",
            },
            // Я
            9999129: {
              staff: "ab102030",
            },
						//// Модерация
            8043508: {
              staff: "trubitsin2903",
            },
            7990933: {
              staff: "shkolaen",
            },
            8043787: {
              staff: "kovalevaira",
            },
            7990921: {
              staff: "anastasiasov",
            },
            8043493: {
              staff: "anastreva",
            },
            8043970: {
              staff: "pasihnichenko",
            },
            10823537: {
              staff: "evgenia-gu",
            },
            7991074: {
              staff: "sysolyatina-d",
            },
            10680125: {
              staff: "bulatkris",
            },
            10823521: {
              staff: "a-v-panfilov",
            },
            8043775: {
              staff: "pashk-inna",
            }
          },
        };

        //ID юзера
        let idUser = document.querySelector(".n-avatar.js-left-avatar").id;

        function deleteButton() {
          // Проверяем, есть ли idUser в списке пользователей
          if (userData.users[idUser]) {
            console.log(
              `Ты среди избранных, кому дана возможность массово менять что-то в сделках на любое кол-во лидов`
            );
          } else {
            waitForSelector(() => {
              const buttons = document.querySelectorAll(
                '[data-type="reassign"], [data-type="change_status"], [data-type="change_field"], [data-type="manage_tags"], [data-type="delete"]'
              );
              // Функция удаляющая нужную кнопку
              function deleteButtonFilter() {
                waitForSelector(() => {
                  //Иннер кнопки
                  const modalBodyInner =
                    document.querySelector(".modal-body__inner");
                  // Сама кнопка
                  waitForSelector(() => {
                    const buttonCancel = modalBodyInner.querySelector(
                      ".button-input.button-cancel"
                    );

										buttonCancel.remove();

										// Текст внутри
										const textInnerModal = modalBodyInner.querySelector(
                      ".modal-body__caption.head_2"
                    );

										textInnerModal.textContent = 'Применить действие возможно только для текущей страницы.';

										//Кнопка "Только для текущей страинцы"
										const centeringButton = modalBodyInner.querySelector(
                      ".modal-body__actions"
                    );

										centeringButton.style.justifyContent = 'center';

                  }, ".button-input.button-cancel");
                }, ".modal-body__inner");
              }
              // Проходим по каждой кнопке и навешиваем событие
              buttons.forEach((button) => {
                button.addEventListener("click", deleteButtonFilter);
              });
            }, '[data-type="reassign"]');
          }

          /////// Ожидание появления селектора
          function waitForSelector(workFunction, selector) {
            // Передаваемый элемент
            const targetElement = document.querySelector(selector);

            if (targetElement) {
              workFunction();
            } else {
              // Создаем экземпляр MutationObserver с колбэком, который будет вызываться при изменениях
              const observer = new MutationObserver(
                (mutationsList, observer) => {
                  // Проверяем, есть ли сейчас элементы, соответствующие вашему селектору
                  const targetElementNow = document.querySelector(selector);

                  if (targetElementNow) {
                    // Если элемент найден, останавливаем отслеживание и запускаем скрипт
                    observer.disconnect();
                    workFunction();
                  }
                }
              );

              // Начинаем отслеживание изменений в корне документа и его потомках
              observer.observe(document.documentElement, {
                childList: true,
                subtree: true,
              });
            }
          }
          /////// Ожидание появления селектора
        }

        deleteButton();

        // Создаем экземпляр MutationObserver
        const observer = new MutationObserver((mutationsList, observer) => {
          // Проверяем каждое изменение в списке мутаций
          for (let mutation of mutationsList) {
            // Проверяем, был ли удален элемент с нужным селектором
            if (mutation.type === "childList") {
              mutation.removedNodes.forEach((node) => {
                if (node.matches && node.matches('[data-type="reassign"]')) {
                  // Если элемент с нужным селектором был удален, вызываем нужный алгоритм
                  deleteButton();
                }
              });
            }
          }
        });
        return true;
      },
      contacts: {
        selected: function () {},
      },
      leads: {
        selected: function () {},
      },
      onSave: function () {
        return true;
      },
    };
    return this;
  };
  return CustomWidget;
});

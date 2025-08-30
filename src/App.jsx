import { useState, useEffect, useCallback } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import TodoInput from "./components/TodoInput";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";
import { lightTheme, darkTheme } from "./theme";
import { translations } from "./translations";
import ResetModal from "./components/ResetModal";
import { projectTodos } from "./projectTodos";

const GlobalStyle = createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  list-style:none;
}  
body {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    transition: all 0.3s ease;
    font-family: sans-serif;
  }
  .todo-enter {
    opacity: 0;
    transform: translateY(-20px);
  }
  .todo-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: all 300ms ease-in;
  }
  .todo-exit {
    opacity: 1;
    transform: translateY(0);
  }
  .todo-exit-active {
    opacity: 0;
    transform: translateY(20px);
    transition: all 300ms ease-in;
  }
`;

const Container = styled.div`
  max-width: 760px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    margin: 1rem;
    padding: 0.5rem;
  }
`;

const App = () => {
  // EN: Get stored todos from localStorage
  // TR: localStorage'dan kayıtlı todo'ları al
  // DE: Gespeicherte Todos aus localStorage holen
  // RU: Получаем сохраненные задачи из localStorage
  // ES: Obtener los todos guardados de localStorage
  const storedTodos = localStorage.getItem("todos");

  // EN: Initialize todos state with storedTodos or default projectTodos
  // TR: todos durumunu, localStorage'dan gelen veriler veya varsayılan projectTodos ile başlat
  // DE: Initialisiere den Todos-State mit gespeicherten Todos oder den Standard projectTodos
  // RU: Инициализируем состояние todos с сохраненными задачами или стандартными projectTodos
  // ES: Inicializa el estado de todos con los datos almacenados o projectTodos por defecto
  const [todos, setTodos] = useState(
    storedTodos ? JSON.parse(storedTodos) : projectTodos
  );

  // EN: State to control visibility of the reset modal
  // TR: Reset modalının görünürlüğünü kontrol eden state
  // DE: State zur Steuerung der Sichtbarkeit des Reset-Modals
  // RU: Состояние для контроля видимости модального окна сброса
  // ES: Estado para controlar la visibilidad del modal de reinicio
  const [showResetModal, setShowResetModal] = useState(false);

  // EN: State to show alert when some default todos are deleted
  // TR: Varsayılan todo'lardan biri silindiğinde uyarı göstermek için state
  // DE: State, um eine Warnung anzuzeigen, wenn Standard-Todos gelöscht werden
  // RU: Состояние для отображения предупреждения, когда удаляется один из стандартных todos
  // ES: Estado para mostrar alerta cuando se eliminen algunos todos predeterminados
  const [showResetAlert, setShowResetAlert] = useState(false);

  // EN: State for the input value of new todo
  // TR: Yeni todo input değerini tutan state
  // DE: State für den Eingabewert des neuen Todos
  // RU: Состояние для значения нового todo
  // ES: Estado para el valor del input del nuevo todo
  const [newTodo, setNewTodo] = useState("");

  // EN: State for theme (light/dark) with localStorage fallback
  // TR: Tema (light/dark) durumu, localStorage varsa oradan al, yoksa 'light'
  // DE: State für das Thema (hell/dunkel) mit localStorage-Fallback
  // RU: Состояние темы (светлая/темная) с fallback на localStorage
  // ES: Estado del tema (claro/oscuro) con respaldo de localStorage
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // EN: State for selected language with localStorage fallback
  // TR: Seçili dili tutan state, localStorage'dan veya default olarak 'en'
  // DE: State für die ausgewählte Sprache mit localStorage-Fallback
  // RU: Состояние для выбранного языка с fallback на localStorage
  // ES: Estado para el idioma seleccionado con respaldo de localStorage
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");

  // EN: State for filter (all/active/completed)
  // TR: Filtreleme durumu (all/active/completed)
  // DE: State für Filter (alle/aktiv/abgeschlossen)
  // RU: Состояние фильтра (все/активные/завершенные)
  // ES: Estado del filtro (todos/activos/completados)
  const [filter, setFilter] = useState("all");

  // EN: State for search input
  // TR: Arama input değeri
  // DE: State für Suchfeld-Eingabe
  // RU: Состояние для значения поля поиска
  // ES: Estado para el valor del input de búsqueda
  const [search, setSearch] = useState("");

  // EN: Callback function to get translation for a key
  // TR: Bir anahtar için çeviri döndüren callback fonksiyon
  // DE: Callback-Funktion, um Übersetzung für einen Schlüssel zu bekommen
  // RU: Callback-функция для получения перевода по ключу
  // ES: Función callback para obtener la traducción de una clave
  const t = useCallback(key => translations[lang][key] || key, [lang]);

  // EN: Function to request showing the reset modal
  // TR: Reset modalını göstermek için çağrılan fonksiyon
  // DE: Funktion, um das Reset-Modal anzuzeigen
  // RU: Функция для запроса отображения модального окна сброса
  // ES: Función para solicitar mostrar el modal de reinicio
  const requestReset = () => {
    setShowResetModal(true);
  };

  // EN: Function to confirm reset and restore default todos
  // TR: Reset işlemini onayla ve varsayılan todo'ları geri yükle
  // DE: Funktion zum Bestätigen des Resets und Wiederherstellen der Standard-Todos
  // RU: Функция для подтверждения сброса и восстановления стандартных todos
  // ES: Función para confirmar el reinicio y restaurar los todos por defecto
  const confirmReset = () => {
    setTodos(projectTodos);
    localStorage.setItem("todos", JSON.stringify(projectTodos));
    setShowResetModal(false);
  };

  // EN: Function to cancel reset modal
  // TR: Reset modalını iptal et
  // DE: Funktion, um das Reset-Modal abzubrechen
  // RU: Функция для отмены модального окна сброса
  // ES: Función para cancelar el modal de reinicio
  const cancelReset = () => {
    setShowResetModal(false);
  };

  // EN: Check if any default todos were deleted and show alert if so
  // TR: Varsayılan todo'lardan biri silindiyse uyarıyı göster
  // DE: Prüfe, ob Standard-Todos gelöscht wurden und zeige ggf. eine Warnung
  // RU: Проверяет, удалены ли стандартные todos, и показывает предупреждение
  // ES: Comprueba si se eliminaron algunos todos predeterminados y muestra alerta si es así
  useEffect(() => {
    const isAnyDeleted = projectTodos.some(
      projectTodo => !todos.find(todo => todo.id === projectTodo.id)
    );
    setShowResetAlert(isAnyDeleted);
  }, [todos]);

  // EN: Persist todos to localStorage whenever they change
  // TR: Todos değiştiğinde localStorage'a kaydet
  // DE: Speichere Todos in localStorage, wann immer sie sich ändern
  // RU: Сохранять todos в localStorage при каждом изменении
  // ES: Guardar los todos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // EN: Persist theme to localStorage whenever it changes
  // TR: Tema değiştiğinde localStorage'a kaydet
  // DE: Speichere das Theme in localStorage, wann immer es sich ändert
  // RU: Сохранять тему в localStorage при каждом изменении
  // ES: Guardar el tema en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // EN: Persist language to localStorage whenever it changes
  // TR: Dil değiştiğinde localStorage'a kaydet
  // DE: Speichere die Sprache in localStorage, wann immer sie sich ändert
  // RU: Сохранять язык в localStorage при каждом изменении
  // ES: Guardar el idioma en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  // EN: Update document title whenever the translation function changes
  // TR: Çeviri fonksiyonu değiştiğinde sayfa başlığını güncelle
  // DE: Aktualisiere den Dokumenttitel, wann immer sich die Übersetzungsfunktion ändert
  // RU: Обновлять заголовок документа при изменении функции перевода
  // ES: Actualizar el título del documento cada vez que cambie la función de traducción
  useEffect(() => {
    document.title = t("title");
  }, [t]);

  // EN: Function to add a new todo
  // TR: Yeni bir todo ekleyen fonksiyon
  // DE: Funktion, um ein neues Todo hinzuzufügen
  // RU: Функция для добавления нового todo
  // ES: Función para agregar un nuevo todo
  const addTodo = () => {
    const trimmed = newTodo.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now(), text: trimmed, done: false }]);
    setNewTodo("");
  };

  // EN: Function to delete a todo by id
  // TR: ID ile todo silen fonksiyon
  // DE: Funktion, um ein Todo anhand der ID zu löschen
  // RU: Функция для удаления todo по id
  // ES: Función para eliminar un todo por id
  const deleteTodo = id => setTodos(todos.filter(todo => todo.id !== id));

  // EN: Function to toggle done status of a todo
  // TR: Todo'nun tamamlandı durumunu değiştiren fonksiyon
  // DE: Funktion, um den Erledigt-Status eines Todos umzuschalten
  // RU: Функция для переключения статуса выполнения todo
  // ES: Función para alternar el estado completado de un todo
  const toggleDone = id =>
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );

  // EN: Function to toggle between light and dark theme
  // TR: Light ve dark temalar arasında geçiş yapan fonksiyon
  // DE: Funktion, um zwischen hellem und dunklem Thema zu wechseln
  // RU: Функция для переключения между светлой и темной темой
  // ES: Función para alternar entre tema claro y oscuro

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // EN: Filter todos based on filter and search
  // TR: Todo'ları filtre ve arama kriterine göre filtrele
  // DE: Filtere Todos basierend auf Filter und Suche
  // RU: Фильтрует todos по фильтру и поиску
  // ES: Filtrar los todos según el filtro y la búsqueda
  const filteredTodos = todos
    .filter(todo =>
      filter === "active"
        ? !todo.done
        : filter === "completed"
        ? todo.done
        : true
    )
    .filter(todo => todo.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Container>
        <Header
          t={t}
          theme={theme}
          toggleTheme={toggleTheme}
          lang={lang}
          setLang={setLang}
          languages={Object.keys(translations)}
          requestReset={requestReset}
          showResetAlert={showResetAlert}
        />
        <TodoInput
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodo={addTodo}
          t={t}
        />
        <FilterBar
          search={search}
          setSearch={setSearch}
          setFilter={setFilter}
          t={t}
          filter={filter}
          filteredTodos={filteredTodos}
        />
        <TodoList
          todos={filteredTodos}
          toggleDone={toggleDone}
          deleteTodo={deleteTodo}
          t={t}
          filter={filter}
          filteredTodos={filteredTodos}
        />
      </Container>
      {showResetModal && (
        <ResetModal
          t={t}
          confirmReset={confirmReset}
          cancelReset={cancelReset}
        />
      )}
    </ThemeProvider>
  );
};

export default App;

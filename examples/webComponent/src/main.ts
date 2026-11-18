import { register } from './MdEditorElement';
// Font faces need document-level registration as well as styles inside the shadow root.
import 'katex/dist/katex.min.css';

register();

import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView } from '@ckeditor/ckeditor5-ui';
import { ATTRIBUTE } from './index';

export class FormatPainterUI extends Plugin {
	/**
	 * @inheritDoc
	 * @returns {string}
	 */
	static get pluginName() {
		return 'FormatPainterUI';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		editor.ui.componentFactory.add(ATTRIBUTE, (locale) => {
			const command = editor.commands.get(ATTRIBUTE);
			const buttonView = new ButtonView(locale);

			buttonView.set({
				label: '格式刷',
				tooltip: true,
				icon: '<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6309"><path d="M886.750071 146.24393h-63.981719V63.98172A27.347615 27.347615 0 0 0 795.347615 36.560983H118.969437A27.347615 27.347615 0 0 0 91.5487 63.98172v310.768351c0 15.209369 12.211368 27.420737 27.420737 27.420737h676.378178a27.347615 27.347615 0 0 0 27.420737-27.420737V219.365895h36.560982v228.506142H458.328478a45.701228 45.701228 0 0 0-45.701229 45.701228v155.384176h-50.307912A9.140246 9.140246 0 0 0 353.179092 658.097686v260.533562c0 1.243073 0.219366 2.486147 0.731219 3.509855a22.740931 22.740931 0 0 0-0.731219 5.557269 95.936018 95.936018 0 1 0 191.945158 0 22.740931 22.740931 0 0 0-0.731219-5.557269 9.28649 9.28649 0 0 0 0.731219-3.582977V658.097686a9.140246 9.140246 0 0 0-9.140245-9.140245h-50.23479v-127.963439h401.000856c25.227078 0 45.701228-20.47415 45.701229-45.701229V191.945159A45.701228 45.701228 0 0 0 886.750071 146.24393z"></path></svg>',
			});

			buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

			this.listenTo(buttonView, 'execute', () => {
				editor.execute(ATTRIBUTE, { type: 'copy' });
				editor.editing.view.focus();
			});

			editor.editing.view.document.on('mouseup', () => {
				editor.execute(ATTRIBUTE, { type: 'apply' });
			});

			editor.editing.view.document.on('blur', () => {
				editor.execute(ATTRIBUTE, { type: 'clear' });
			});

			return buttonView;
		});
	}
}
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { registerCommands } from './commands';
import { registerLanguageProvider } from './languageProvider';
import { IssuesNotebookProvider } from './notebookProvider';
import { OctokitProvider } from './octokitProvider';
import { ProjectContainer } from './project';

export function activate(context: vscode.ExtensionContext) {
	const octokit = new OctokitProvider();
	const projectContainer = new ProjectContainer();
	const notebookProvider = new IssuesNotebookProvider(projectContainer, octokit);
	context.subscriptions.push(vscode.notebook.registerNotebookContentProvider('github-issues', notebookProvider));
	context.subscriptions.push(registerLanguageProvider(projectContainer, octokit));
	context.subscriptions.push(registerCommands(notebookProvider));
}

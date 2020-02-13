// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import * as linter from '../../linter';
import * as utils from '../../utils';
import { compare } from '../testUtils';

import { IRunOpts, ISpectralFullResult } from '@stoplight/spectral';
import { DiagnosticSeverity } from '@stoplight/types';

const SLOW_TIMEOUT_MS = 5000;
const TEST_BASE = '../../../src/test/fixtures';
const linterProvider = new linter.LinterCache();

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('Diagnostic severity test', () => {
    assert.equal(vscode.DiagnosticSeverity.Error, utils.ourSeverity(DiagnosticSeverity.Error));
    assert.equal(vscode.DiagnosticSeverity.Hint, utils.ourSeverity(DiagnosticSeverity.Hint));
    assert.equal(vscode.DiagnosticSeverity.Information, utils.ourSeverity(DiagnosticSeverity.Information));
    assert.equal(vscode.DiagnosticSeverity.Warning, utils.ourSeverity(DiagnosticSeverity.Warning));
  });

  test('Linting a plaintext document', () => {
    return new Promise(async (resolve, reject) => {
      const plaintextPath = path.resolve(__dirname, TEST_BASE, 'plaintext.txt');
      const plaintextUri = vscode.Uri.parse(plaintextPath);
      const plaintextContents = fs.readFileSync(plaintextPath, 'utf8');
      try {
        const spectral = await linterProvider.getLinter(plaintextUri);
        const linterOptions: IRunOpts = {
          resolve: { documentUri: plaintextUri.toString() },
        };
        const output = await spectral.runWithResolved(plaintextContents, linterOptions);
        assert.ok(output.hasOwnProperty('resolved'), 'Check for output.resolved');
        assert.ok(output.hasOwnProperty('results'), 'Check for output.results');
        compare('plaintext.txt', output.results, 'ext', 'Compare results');
        resolve(output);
      } catch (ex) {
        reject(ex);
      }
    });
  }).timeout(SLOW_TIMEOUT_MS);

  test('Lint non-oas YAML document', () => {
    return new Promise(async (resolve, reject) => {
      const testPath = path.resolve(__dirname, TEST_BASE, 'non-oas.yaml');
      const testUri = vscode.Uri.parse(testPath);
      const testContents = fs.readFileSync(testPath, 'utf8');
      try {
        const spectral = await linterProvider.getLinter(testUri);
        const linterOptions: IRunOpts = {
          resolve: { documentUri: testUri.toString() },
        };
        const output = await spectral.runWithResolved(testContents, linterOptions);
        assert.ok(output.hasOwnProperty('results'), 'Check for output.results');
        compare('non-oas.yaml', output.results, 'ext', 'Compare results');
        resolve(output);
      } catch (ex) {
        reject(ex);
      }
    });
  }).timeout(SLOW_TIMEOUT_MS);

  test('Lint non-oas JSON document', () => {
    return new Promise(async (resolve, reject) => {
      const testPath = path.resolve(__dirname, TEST_BASE, 'non-oas.json');
      const testUri = vscode.Uri.parse(testPath);
      const testContents = fs.readFileSync(testPath, 'utf8');
      try {
        const spectral = await linterProvider.getLinter(testUri);
        const linterOptions: IRunOpts = {
          resolve: { documentUri: testUri.toString() },
        };
        const output = await spectral.runWithResolved(testContents, linterOptions);
        assert.ok(output.hasOwnProperty('results'), 'Check for output.results');
        compare('non-oas.json', output.results, 'ext', 'Compare results');
        resolve(output);
      } catch (ex) {
        reject(ex);
      }
    });
  }).timeout(SLOW_TIMEOUT_MS);

  test('Linting a compliant yaml document', () => {
    return new Promise(async (resolve, reject) => {
      const compliantPath = path.resolve(__dirname, TEST_BASE, 'lintable.yaml');
      const compliantUri = vscode.Uri.parse(compliantPath);
      const compliantContents = fs.readFileSync(compliantPath, 'utf8');
      try {
        const spectral = await linterProvider.getLinter(compliantUri);
        const linterOptions: IRunOpts = {
          resolve: { documentUri: compliantUri.toString() },
        };
        const output = await spectral.runWithResolved(compliantContents, linterOptions);
        assert.ok(output.hasOwnProperty('resolved'), 'Check for output.resolved');
        assert.ok(output.hasOwnProperty('results'), 'Check for output.results');
        compare('lintable.yaml', output.results, 'ext', 'Compare results');
        resolve(output);
      } catch (ex) {
        reject(ex);
      }
    });
  }).timeout(SLOW_TIMEOUT_MS);

  test('Linting a compliant json document', () => {
    return new Promise(async (resolve, reject) => {
      const compliantPath = path.resolve(__dirname, TEST_BASE, 'lintable.yaml');
      const compliantUri = vscode.Uri.parse(compliantPath);
      const compliantContents = fs.readFileSync(compliantPath, 'utf8');
      try {
        const spectral = await linterProvider.getLinter(compliantUri);
        const linterOptions: IRunOpts = {
          resolve: { documentUri: compliantUri.toString() },
        };
        const output = await spectral.runWithResolved(compliantContents, linterOptions);
        assert.ok(output.hasOwnProperty('resolved'), 'Check for output.resolved');
        assert.ok(output.hasOwnProperty('results'), 'Check for output.results');
        compare('lintable.json', output.results, 'ext', 'Compare results');
        resolve(output);
      } catch (ex) {
        reject(ex);
      }
    });
  }).timeout(SLOW_TIMEOUT_MS);

  test('Spec scenario 1', () => {
    return new Promise(async (resolve, reject) => {
      const testPath = path.resolve(__dirname, TEST_BASE, 'scenario1.yaml');
      const testUri = vscode.Uri.parse(testPath);
      const testContents = fs.readFileSync(testPath, 'utf8');
      try {
        const spectral = await linterProvider.getLinter(testUri);
        const linterOptions: IRunOpts = {
          resolve: { documentUri: testUri.toString() },
        };
        const output = await spectral.runWithResolved(testContents, linterOptions);
        assert.ok(output.hasOwnProperty('results'), 'Check for output.results');
        compare('scenario1.yaml', output.results, 'ext', 'Compare results');
        resolve(output);
      } catch (ex) {
        reject(ex);
      }
    });
  }).timeout(SLOW_TIMEOUT_MS);

  test('Spec scenario 2', () => {
    return new Promise(async (resolve, reject) => {
      const testPath = path.resolve(__dirname, TEST_BASE, 'scenario2.yaml');
      const testUri = vscode.Uri.parse(testPath);
      const testContents = fs.readFileSync(testPath, 'utf8');
      try {
        const spectral = await linterProvider.getLinter(testUri);
        const linterOptions: IRunOpts = {
          resolve: { documentUri: testUri.toString() },
        };
        const output = await spectral.runWithResolved(testContents, linterOptions);
        assert.ok(output.hasOwnProperty('results'), 'Check for output.results');
        compare('scenario2.yaml', output.results, 'ext', 'Compare results');
        resolve(output);
      } catch (ex) {
        reject(ex);
      }
    });
  }).timeout(SLOW_TIMEOUT_MS);

  test('Spec scenario 3', () => {
    return new Promise(async (resolve, reject) => {
      const testPath = path.resolve(__dirname, TEST_BASE, 'scenario3.yaml');
      const testUri = vscode.Uri.parse(testPath);
      const testContents = fs.readFileSync(testPath, 'utf8');
      try {
        const spectral = await linterProvider.getLinter(testUri);
        const linterOptions: IRunOpts = {
          resolve: { documentUri: testUri.toString() },
        };
        const output = await spectral.runWithResolved(testContents, linterOptions);
        assert.ok(output.hasOwnProperty('results'), 'Check for output.results');
        compare('scenario3.yaml', output.results, 'ext', 'Compare results');
        resolve(output);
      } catch (ex) {
        reject(ex);
      }
    });
  }).timeout(SLOW_TIMEOUT_MS);

  test('Spec scenario 4a', () => {
    return new Promise(async (resolve, reject) => {
      const testPath = path.resolve(__dirname, TEST_BASE, 'scenario4.yaml');
      const testUri = vscode.Uri.parse(testPath);
      const testContents = fs.readFileSync(testPath, 'utf8');
      try {
        const spectral = await linterProvider.getLinter(testUri);
        const linterOptions: IRunOpts = {
          resolve: { documentUri: testUri.toString() },
        };
        const output = await spectral.runWithResolved(testContents, linterOptions);
        assert.ok(output.hasOwnProperty('results'), 'Check for output.results');
        compare('scenario4.yaml', output.results, 'ext', 'Compare results');
        resolve(output);
      } catch (ex) {
        reject(ex);
      }
    });
  }).timeout(SLOW_TIMEOUT_MS);

  test('Spec scenario 4b', () => {
    return new Promise(async (resolve, reject) => {
      const testPath = path.resolve(__dirname, TEST_BASE, 'includes', 'parameterComplete.yaml');
      const testUri = vscode.Uri.parse(testPath);
      const testContents = fs.readFileSync(testPath, 'utf8');
      try {
        const spectral = await linterProvider.getLinter(testUri);
        const linterOptions: IRunOpts = {
          resolve: { documentUri: testUri.toString() },
        };
        const output = await spectral.runWithResolved(testContents, linterOptions);
        assert.ok(output.hasOwnProperty('results'), 'Check for output.results');
        compare('includes/parameterComplete.yaml', output.results, 'ext', 'Compare results');
        resolve(output);
      } catch (ex) {
        reject(ex);
      }
    });
  }).timeout(SLOW_TIMEOUT_MS);
});

import {reportResults} from '@form8ion/results-reporter';
import chooseScaffolder from './scaffolder-chooser';
import liftDocumentation from './documentation';
import applyEnhancers from './enhancers';

export default async function ({scaffolders, decisions, enhancers}) {
  const scaffolder = await chooseScaffolder(scaffolders, decisions);
  const projectRoot = process.cwd();
  const results = await scaffolder({projectRoot});

  await Promise.all([
    applyEnhancers({results, enhancers}),
    liftDocumentation({projectRoot, results})
  ]);

  reportResults({nextSteps: results.nextSteps});
}

import {expect, test} from '@oclif/test'
import { copy } from 'fs-extra'
const path = require('path')

import cmd = require('../src')



describe('Should throw unsupported warning for unsupported metadata', () => {

  test
  .stdout()
  .stderr()
  .do(() => {
    return cmd.run([path.resolve('test/data/Thing__c.fake'), path.resolve('test/data/Thing__c.fake'),path.resolve('test/data/Thing__c.fake'), path.resolve('test/data/Thing__c.fake')])
    .catch((exitCode) => {

    })
  })
  .it('Should throw an unsupported warning', ctx => {
    expect(ctx.stderr).to.contain('Warning: Metadata of type Fake is unsupported. Using git merge')
  })
})

describe('Should not throw unsupported warning for supported metadata ', () => {
  before(()=> {
    return Promise.all([
      copy(path.resolve('test/data/Custom__c.current.object'), path.resolve('test/data/Custom__c.test.current.object')),
      copy(path.resolve('test/data/Custom__c.other.object'), path.resolve('test/data/Custom__c.test.other.object'))
    ])
  })

  test
  .stdout()
  .stderr()
  .do(() => cmd.run([path.resolve('test/data/Custom__c.base.object'), path.resolve('test/data/Custom__c.test.current.object'),path.resolve('test/data/Custom__c.test.other.object'), path.resolve('test/data/Custom__c.test.current.object')]))
  .catch(err => {})
  .it('Shoud not throw unsupported warning', ctx => {
    expect(ctx.stderr).to.not.contain('Warning: Metadata of type CustomObject is unsupported. Using git merge')
  })
})

describe('Should handle Custom Objects', () => {
  before(()=> {
    return Promise.all([
      copy(path.resolve('test/data/Custom__c.current.object'), path.resolve('test/data/Custom__c.test.current.object')),
      copy(path.resolve('test/data/Custom__c.other.object'), path.resolve('test/data/Custom__c.test.other.object'))
    ])
  })

  test
  .stdout()
  .do(() => cmd.run([path.resolve('test/data/Custom__c.base.object'), path.resolve('test/data/Custom__c.test.current.object'),path.resolve('test/data/Custom__c.test.other.object'), path.resolve('test/data/Custom__c.test.current.object')]))
  .catch(err => {})
  .it('shows user email when logged in', ctx => {
    console.log(ctx.stdout);
    // expect(ctx.stdout).to.equal('jeff@example.com\n')
  })

})

describe('Should handle PermissionSets', () => {
  before(()=> {
    console.log('copying?');
    return copy(path.resolve('test/data/PermissionSet.current.permissionset'), path.resolve('test/data/PermissionSet.test.current.permissionset'))
  })
  test
  .stdout()
  .do(() => cmd.run([path.resolve('test/data/PermissionSet.base.permissionset'), path.resolve('test/data/PermissionSet.test.current.permissionset'),path.resolve('test/data/PermissionSet.other.permissionset'), path.resolve('test/data/PermissionSet.test.current.object')]))
  .catch(err => {})
  .it('shows user email when logged in', ctx => {
    console.log(ctx.stdout);
    // expect(ctx.stdout).to.equal('jeff@example.com\n')
  })

})
